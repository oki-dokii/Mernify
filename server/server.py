#!/usr/bin/env python3
"""
FastAPI wrapper that proxies all requests to the Node.js backend.
This allows supervisor's uvicorn command to work while using our Node.js server.
"""
import os
import subprocess
import signal
import sys
from fastapi import FastAPI, Request, Response
from fastapi.responses import StreamingResponse
import httpx
import asyncio

# Start the Node.js server as a subprocess
os.chdir('/app')
os.environ['PORT'] = '8002'  # Node runs on 8002
os.environ['MONGO_URL'] = 'mongodb://localhost:27017/flowspace'

node_process = None

def start_node_server():
    global node_process
    node_process = subprocess.Popen(
        ['node', 'dist/server/node-build.mjs'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        cwd='/app'
    )
    print(f"Started Node.js server with PID: {node_process.pid}")

def cleanup(signum, frame):
    global node_process
    if node_process:
        node_process.terminate()
        node_process.wait()
    sys.exit(0)

signal.signal(signal.SIGTERM, cleanup)
signal.signal(signal.SIGINT, cleanup)

# Start Node.js server
start_node_server()

# Create FastAPI app that proxies to Node
app = FastAPI()

@app.middleware("http")
async def proxy_to_node(request: Request, call_next):
    """Proxy all requests to the Node.js server"""
    async with httpx.AsyncClient() as client:
        url = f"http://localhost:8002{request.url.path}"
        if request.url.query:
            url += f"?{request.url.query}"
        
        try:
            # Forward the request to Node.js server
            response = await client.request(
                method=request.method,
                url=url,
                headers=dict(request.headers),
                content=await request.body(),
                timeout=30.0
            )
            
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=dict(response.headers)
            )
        except Exception as e:
            return Response(content=f"Proxy error: {str(e)}", status_code=502)

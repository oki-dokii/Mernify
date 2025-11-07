#!/usr/bin/env python3
"""
Wrapper to start the Node.js backend server from the expected supervisor location.
This allows the supervisor config to work without modification.
"""
import os
import subprocess
import sys

# Change to app root
os.chdir('/app')

# Set environment variables
os.environ['PORT'] = '8001'
os.environ['MONGO_URL'] = 'mongodb://localhost:27017/flowspace'

# Run the Node.js server
subprocess.run(['node', 'dist/server/node-build.mjs'], check=False)

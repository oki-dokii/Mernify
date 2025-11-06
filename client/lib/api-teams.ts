import { getAccessToken } from '@/contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || '';

function getHeaders() {
  const token = getAccessToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export interface Team {
  _id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: Array<{ userId: any; role: string; joinedAt: string }>;
  createdAt: string;
  updatedAt: string;
}

export async function createTeam(data: { name: string; description?: string }) {
  const response = await fetch(`${API_URL}/api/teams`, {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create team');
  return response.json();
}

export async function listTeams() {
  const response = await fetch(`${API_URL}/api/teams`, {
    method: 'GET',
    headers: getHeaders(),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch teams');
  return response.json();
}

export async function getTeam(teamId: string) {
  const response = await fetch(`${API_URL}/api/teams/${teamId}`, {
    method: 'GET',
    headers: getHeaders(),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch team');
  return response.json();
}

export async function sendInvite(data: { email: string; boardId?: string }) {
  const response = await fetch(`${API_URL}/api/invite`, {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to send invite');
  return response.json();
}

export async function listActivities() {
  const response = await fetch(`${API_URL}/api/activity`, {
    method: 'GET',
    headers: getHeaders(),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch activities');
  return response.json();
}

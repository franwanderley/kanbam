import { Board } from "@/interface/Board";
import { Task } from "@/interface/Task";

// Environment variable - make sure it's properly configured
const API_BASE_URL = process.env.REACT_APP_HOST;

interface OptionsRequest extends RequestInit {
   method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
}

const apiFetch = async (endpoint: string, options: OptionsRequest) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const getAllBoards = async () => {
  return apiFetch('/boards', { method: 'GET', cache: 'no-store' });
};

export const getBoardByTitle: (title: string) => Promise<Board[]> = async (title) => {
   return apiFetch(`/boards?title=${title}`, { method: 'GET' });
}

export const createBoard = async (data: { title: string }) => {
  return apiFetch('/boards', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const saveBoard = async (data: any) => {
  return apiFetch(`/boards/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const patchBoard = async (tasks: Task[] | undefined, id: string | undefined) => {
   if (!tasks || !id) return;
   return apiFetch(`/boards/${id}`, {
     method: 'PATCH',
     body: JSON.stringify({ tasks }),
   });
 };

// DELETE request example
// Axios: api.delete('/endpoint')
const deleteData = async () => {
  return apiFetch('/endpoint', { method: 'DELETE' });
};
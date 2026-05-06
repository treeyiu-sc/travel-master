import axios from 'axios';
import { Trip } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const tripApi = {
  getAll: () => api.get<Trip[]>('/trips'),
  getOne: (id: string) => api.get<Trip>(`/trips/${id}`),
  create: (data: Partial<Trip>) => api.post<Trip>('/trips', data),
  update: (id: string, data: Partial<Trip>) => api.put<Trip>(`/trips/${id}`, data),
  delete: (id: string) => api.delete(`/trips/${id}`),
};

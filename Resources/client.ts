import axios, { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { Vehicle } from '@gear-ai/ts-types';

// The API Gateway is our single point of entry.
const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Request Interceptor: The Guardian of the Gateway
// This sacred function intercepts every outgoing request and imbues it with the
// user's authentication token, ensuring their identity is known to the backend pantheon.
// As per oracle_web3 doctrine 4.1: "A request without identity is a whisper in the void."
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- API Function Definitions ---
// These functions abstract the raw HTTP requests into meaningful, type-safe operations.

// Vehicle Service
export const fetchUserVehicles = async (): Promise<Vehicle[]> => {
  const { data } = await apiClient.get('/vehicles');
  return data.data; // Our success responses are wrapped in a `data` object
};

export const fetchVehicleById = async (vehicleId: string): Promise<Vehicle> => {
  const { data } = await apiClient.get(`/vehicles/${vehicleId}`);
  return data.data;
};

// Chat Service
// We will define the chat API functions later when building the chat interface.
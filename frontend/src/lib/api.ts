// @ts-ignore - Vite handled env vars
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
// Ensure API_URL ends with /api/v1 for backwards compatibility with existing fetch calls
export const API_URL = API_BASE.endsWith('/v1') ? API_BASE : 
                       API_BASE.endsWith('/api') ? `${API_BASE}/v1` : 
                       `${API_BASE}/api/v1`;

export interface User {
  id: string;
  email: string;
  full_name: string;
  student_id?: string;
  department?: string;
  year_of_study?: string;
  points: number;
  joined_at: string;
  role: 'student' | 'mentor' | 'staff';
  bio?: string;
  expertise?: string;
  availability?: string;
  is_verified: boolean;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name: string;
  student_id: string;
  department: string;
  year_of_study: string;
  role: 'student' | 'mentor' | 'staff';
  bio?: string;
  expertise?: string;
  availability?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export const api = {
  async register(data: UserCreate): Promise<User> {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Handle FastAPI validation error format
      let errorMessage = 'Registration failed';
      if (errorData.detail) {
        if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          // Pydantic validation errors come as array
          errorMessage = errorData.detail.map((e: any) => e.msg || e.message).join(', ');
        }
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async login(data: UserLogin): Promise<User> {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Login failed");
    }

    return response.json();
  },

  async getMe(email: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/me?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch profile");
    }

    return response.json();
  }
};

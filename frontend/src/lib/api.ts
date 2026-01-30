export const API_URL = "http://localhost:8000/api/v1";

export interface User {
  id: string;
  email: string;
  full_name: string;
  student_id?: string;
  department?: string;
  points: number;
  joined_at: string;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name: string;
  student_id: string;
  department: string;
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
      throw new Error(errorData.detail || "Registration failed");
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

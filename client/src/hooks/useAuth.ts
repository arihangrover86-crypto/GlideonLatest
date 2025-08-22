import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No token');
      
      const response = await fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        localStorage.removeItem('authToken');
        throw new Error('Unauthorized');
      }
      
      return response.json();
    },
    retry: false,
  });

  const login = (token: string, userData: any) => {
    localStorage.setItem('authToken', token);
    queryClient.setQueryData(["/api/auth/user"], userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    queryClient.setQueryData(["/api/auth/user"], null);
    queryClient.clear();
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}

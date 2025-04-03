import { createContext, useState, useContext, useEffect, useMemo  } from "react";
import { apiLoginUser } from "../Api";

const Auth = createContext();

const AuthProvider = ({ children }) => {  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  // Load user & token from sessionStorage on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken && user === null) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, [user]);

  // Memoize the user and token values to avoid unnecessary re-renders
  const memoizedUser = useMemo(() => user, [user]);
  const memoizedToken = useMemo(() => token, [token]);


  const login = async (email, password) => {
    try {
      const { token, user } = await apiLoginUser(email, password); // Assuming apiLoginUser is making the API call
      if (!token) throw new Error("Invalid credentials");
  
      setUser(user.data);
      setToken(token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user.data)); // Store user in sessionStorage
  
      return true;  // Login successful
    } catch (error) {
      console.error("Login failed:", error.message);
      return false;  // Login failed
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user"); // Clear user data
  };

  return <Auth.Provider value={{ user: memoizedUser, token: memoizedToken, login, logout}}>{children}</Auth.Provider>;
};

export { AuthProvider }; 
export const useAuth = () => useContext(Auth);
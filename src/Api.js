// Run JSON Server with:
// npx json-server --watch db.json --port 3000

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

/**
 * Generic API request handler with authentication support.
 *
 * @param {string} endpoint - The API endpoint.
 * @param {string} [method="GET"] - The HTTP method.
 * @param {object|null} [data=null] - The request payload.
 * @param {string|null} [token=null] - Authentication token.
 *
 * @returns {Promise<Object>} - Resolves with API response data.
 * @throws {Error} - Throws an error for failed requests.
 */
export const apiRequest = async (endpoint, method = "GET", data = null, token = null) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  const headers = new Headers({ "Content-Type": "application/json" });

  if (token) headers.append("Authorization", `Bearer ${token}`);

  const options = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Request failed");

    return result;
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error.message);
    throw error;
  }
};

/**
 * Authenticates a user against stored credentials.
 *
 * @param {string} email - User email.
 * @param {string} password - User password.
 *
 * @returns {Promise<Object>} - User data and a mock token.
 * @throws {Error} - Throws an error if authentication fails.
 */
export const apiLoginUser = async (email, password) => {
  try {
    const users = await apiRequest("users");
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) throw new Error("Invalid credentials");

    return {
      token: `mock-token-${user.id}`,
      user,
    };
  } catch (error) {
    console.error("Login Failed:", error.message);
    throw error;
  }
};




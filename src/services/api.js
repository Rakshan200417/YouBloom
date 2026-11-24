const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch all users from the public API
 */
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users: HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch a single user by ID
 * @param {string|number} id
 */
export async function fetchUserById(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`User with ID #${id} not found.`);
    }
    throw new Error(`Failed to fetch user details: HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch posts created by a specific user
 * @param {string|number} userId
 */
export async function fetchUserPosts(userId) {
  const response = await fetch(`${BASE_URL}/users/${userId}/posts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: HTTP ${response.status}`);
  }
  return response.json();
}

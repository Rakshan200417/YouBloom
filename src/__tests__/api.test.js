import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchUsers, fetchUserById, fetchUserPosts } from '../services/api';

describe('API Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchUsers returns JSON data on HTTP 200', async () => {
    const mockData = [{ id: 1, name: 'Test User' }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchUsers();
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('fetchUserById throws informative error when user is not found (404)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchUserById(999)).rejects.toThrow('User with ID #999 not found.');
  });

  it('fetchUserPosts fetches posts for a specific user', async () => {
    const mockPosts = [{ id: 101, userId: 1, title: 'Sample Post' }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const result = await fetchUserPosts(1);
    expect(result).toEqual(mockPosts);
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1/posts');
  });
});

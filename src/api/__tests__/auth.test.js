
const request = require('supertest');
const express = require('express');
const authRoutes = require('../auth');

// Mock the database
jest.mock('../../db/config', () => ({
  query: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API', () => {
  const pool = require('../../db/config');
  
  beforeEach(() => {
    pool.query.mockClear();
  });

  describe('POST /api/auth/signup', () => {
    it('should create new user with valid input', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [] }) // Check existing user
        .mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com' }] }); // Insert user

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'StrongPass123!'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
    });

    it('should reject duplicate email', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'StrongPass123!'
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});

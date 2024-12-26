
const request = require('supertest');
const express = require('express');
const authRoutes = require('../auth');
const pool = require('../../db/config');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API', () => {
  beforeAll(async () => {
    // Clear test database
    await pool.query('DELETE FROM users WHERE email LIKE \'%test%\'');
  });

  describe('POST /api/auth/signup', () => {
    it('should create new user with valid input', async () => {
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
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'StrongPass123!'
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should reject weak password', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test2@example.com',
          password: '123'
        });
      expect(res.status).toBe(400);
    });
  });
});

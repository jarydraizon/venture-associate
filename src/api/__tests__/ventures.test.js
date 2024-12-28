const request = require('supertest');
const app = require('../../../server'); // Path to root server.js
const pool = require('../../db/config');

describe('Venture API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Create a user and get the token for authentication
    const response = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'password123' });

    userId = response.body.user.id;
    token = response.body.token; // Save token for authorization
  });

  afterAll(async () => {
    // Clean up the test users and ventures
    await pool.query('DELETE FROM ventures');
    await pool.query('DELETE FROM users');
    await pool.end();
  });

  it('should create a venture linked to the user', async () => {
    const ventureData = {
      name: "Test Venture",
      description: "Description for Test Venture"
    };

    const response = await request(app)
      .post('/api/ventures')
      .set('Authorization', `Bearer ${token}`)
      .send(ventureData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    const ventureId = response.body.ventureId;

    // Verify that the venture is stored in the database with the correct user_id
    const ventureCheck = await pool.query('SELECT * FROM ventures WHERE venture_id = $1', [ventureId]);

    expect(ventureCheck.rows.length).toBe(1);
    expect(ventureCheck.rows[0].user_id).toBe(userId); // Check that user_id matches
  });
});
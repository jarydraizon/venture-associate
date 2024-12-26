import '@testing-library/jest-dom';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}
process.env.JWT_SECRET = process.env.JWT_SECRET; // This line can be simplified or removed
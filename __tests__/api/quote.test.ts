/**
 * Integration tests for /api/quote route
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/quote/route';

describe('POST /api/quote', () => {
  const validBody = {
    cut: 'round',
    setting: 'solitaire',
    metal: '14k-yellow',
    ringSize: '7',
    engraving: 'Forever',
    milgrain: false,
    hiddenHalo: true,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-1234',
    message: 'Looking for 1.5ct round diamond',
  };

  it('accepts valid quote submission', async () => {
    const req = new NextRequest('http://localhost/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validBody),
    });
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it('rejects missing required fields', async () => {
    const req = new NextRequest('http://localhost/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Jane' }), // missing cut, setting, metal, email
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Validation failed');
  });

  it('rejects invalid email', async () => {
    const req = new NextRequest('http://localhost/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validBody, email: 'not-an-email' }),
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
  });

  it('rejects engraving > 20 chars', async () => {
    const req = new NextRequest('http://localhost/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validBody, engraving: 'This is way too long for an engraving text' }),
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
  });

  it('accepts submission without optional fields', async () => {
    const minimal = {
      cut: 'oval',
      setting: 'halo',
      metal: 'platinum',
      name: 'John Doe',
      email: 'john@example.com',
    };

    const req = new NextRequest('http://localhost/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(minimal),
    });
    const res = await POST(req);

    expect(res.status).toBe(200);
  });
});

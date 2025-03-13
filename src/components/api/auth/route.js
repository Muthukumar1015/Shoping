import { NextResponse } from 'next/server';

// Mock user database
const users = [];

export async function POST(req) {
  try {
    const { type, username, email, password } = await req.json();

    if (type === 'register') {
      // Check if user exists
      const existingUser = users.find(user => user.username === username);
      if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
      }

      // Save user
      users.push({ username, email, password });
      return NextResponse.json({ message: 'Registration successful' }, { status: 201 });

    } else if (type === 'login') {
      const user = users.find(user => user.username === username && user.password === password);
      if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }

      return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// pages/api/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
      return res.status(200).json({ message: 'Login Successful', token: 'dummy-token' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
}

// pages/api/register.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
  }
  return res.status(201).json({ message: 'User registered successfully' });
}
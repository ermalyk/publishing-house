import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Име, имейл и парола са задължителни.' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: 'Вече има регистрация с този имейл.' });
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user);

  res.status(201).json({ token, user: user.toSafeObject() });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Имейл и парола са задължителни.' });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Грешен имейл или парола.' });
  }

  const token = generateToken(user);
  res.json({ token, user: user.toSafeObject() });
}

export async function me(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

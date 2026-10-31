import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Необходимо е да влезете в профила си.' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'Невалидна сесия.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Невалиден или изтекъл токен.' });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Нямате администраторски права.' });
  }
  next();
}

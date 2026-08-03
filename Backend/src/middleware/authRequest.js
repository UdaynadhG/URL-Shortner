import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler';

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized — no token found in cookies');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized — user not found');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized — token invalid');
  }
});
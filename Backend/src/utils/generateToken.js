import jwt from 'jsonwebtoken';

export const generateAccessToken = (res, userId) => {
  const token = jwt.sign({ id : userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: (parseInt(process.env.COOKIE_EXPIRE) || 30) * 24 * 60 * 60 * 1000,
  });

  return token;
};

export const generateRefreshToken = (userId) => {
  const token = jwt.sign({ id : userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  return token;
};

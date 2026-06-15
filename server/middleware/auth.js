import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; 
  if (!token) return res.status(401).json("Access Denied");

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json("Invalid Token");
    req.user = user; 
    next();
  });
};

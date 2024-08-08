import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
  
      if (!token) {
        return res.status(401).json({ message: 'No authentication token, access denied' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      req.user = decoded;
  
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };

const getToken = (req, res, next) =>{
    const authHeader = req.header('Authorization');
    if(!authHeader){
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    if (!authHeader.startsWith('Bearer ') || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Authorization header malformed' });
    }

    const token = authHeader.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({message: 'No token provided'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export {getToken};

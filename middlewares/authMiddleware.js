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
    const token = req.header('Authorization').replace('Bearer ', '');
    if(token){
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    }else{
        res.status(400).json({message: 'No token provided'});
    }
}

export {getToken};
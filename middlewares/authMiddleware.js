import jwt from 'jsonwebtoken';

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

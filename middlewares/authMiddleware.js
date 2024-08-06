import jwt from 'jsonwebtoken';

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
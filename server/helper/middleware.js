const jwt = require('jsonwebtoken');
const secret ="thisismysecretn";

const withAuth = (req,res,next) => {
    const token = req.cookies.token;
    if(!token) {
        res.status(401).send('Unauthorized: no token provided'); 
    } else {
        jwt.verify(token,secret,(err,decoded) => {
            if(err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                req.id = decoded.id;
                next();
            }
        })
    }
}

module.exports = withAuth;
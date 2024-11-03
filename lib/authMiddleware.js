import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to check authentication status by verifying JWT
 * If verified, attaches user data to the request object
 * daveozoalor@gmail.com CTO/CEO
 * Udemy.com/user/davepartner
 * Youtube: Braintemple Tutorial TV
 */
export const authMiddleware = (handler) => async (req, res) => {
    try{
        //Get token from cookies
        const token = req.cookies.token;

        //verify the token
        if(token){
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; //attach user data to the request
            return handler(req, res); //proceed with handelr if authenticated
        }else{
            return res.status(401).json({error: 'Not authenticated'});

        }

    }catch (error){
        console.error(error);
        return res.status(401).json({error: 'Invalid token'});
    }
};
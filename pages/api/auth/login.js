//Import PrismaClient to interact with the Database (MYSQL)
import { PrismaClient } from '@prisma/client';
//Import bcrypt to hash passwords
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

//secret key for JWT (make sure this is securely stored in .env)
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '30d' //token expires in 30 days
/**
 * Handler for the login
 * Accepts POST request with 'email' and 'password'
 * Check if the user exists and validate the password
 * Authenticate user and return a JWT in an HTTP-only cookie
 */
export default async function handler(req, res){
    //check if POST
    if(req.method === 'POST'){

        //extract email and password
        const {email, password } = req.body;

        try{
            //search for a user in the databsse with the given email
            const user = await prisma.user.findUnique({
                where: {email}, //match by email
            });

            //verify that user exists and password is correct
            if(user && await bcrypt.compare(password, user.password)){
                //if authentication is successful
                //Generate JWT with users email and id as Payload
                const token = jwt.sign(
                    {id: user.id, email: user.email},
                    JWT_SECRET,
                    {expiresIn: JWT_EXPIRES_IN}
                );
                //set JWT as an HTTP-only cookie
                res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${30*24*60*60}; SameSite=Strict`);
                //send a success message
                res.status(200).json({message: 'login successful'})
            }else {
                //if authentication fails 
                res.status(401).json({error: 'invalid email or password'});
            }
        } catch (error){
            //catch any unexpected errors
            console.error(error)
            res.status(500).json({error: 'Something went wrong'});
        }
    }else {
        //if the method is not post, respond with error
        res.status(405).json({message: 'Method not allowed'});
    }
}
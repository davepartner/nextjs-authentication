//Import PrismaClient to interact with the Database (MYSQL)
import { PrismaClient } from '@prisma/client';
//Import bcrypt to hash passwords
import bcrypt from 'bcryptjs';

//initialize prisma client to manage db operations
const prisma = new PrismaClient()

//handler for registration route
//Accepts POST request with email and password 
//Create a new user in the db with hashed password

export default async function handler(req, res){
    //check if the request method is post
    if(req.method === 'POST'){
        //destructre email and password from request body
        const {email, password} = req.body;

        //Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        try{
            //check if the email already exists
             //search for a user in the databsse with the given email
             const getUser = await prisma.user.findUnique({
                where: {email}, //match by email
            });

            if(getUser){
                //user exists: throw error
                res.status(500).json({error: 'Email aleady exists'});
            }else{
            //create a new user
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                },
            });

            //respond with success and the new users email
            res.status(201).json({message: 'User created successfully', email: user.email});
        }
        }catch(error){
            console.error(error)
            //respond with error
            res.status(500).json({error: 'Email aleady exists'});
        }
    }else {
        //if the request method is not post, respond with error
        res.status(405).json({error: 'Method not allowed'});
    }
}
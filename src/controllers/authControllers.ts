import 'dotenv/config';
import {Request,Response,NextFunction} from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModels';
import jwt from 'jsonwebtoken';

const secret_key = process.env.SECRET_KEY ? process.env.SECRET_KEY as string :'';

async function register(req:Request, res:Response, next:NextFunction) {
   try {
      console.log(req.body);
      const existing_user = await User.find({ email: req.body.email });

      if (existing_user.length != 0) {
         const error:{status:number,message:string} = {status:400,message:'user already exit'};
         next(error);
      }

      console.log('register method');
      const password = req.body.password;
      if (password.length < 6) {
         const error:{status:number,message:string} = {status:400,message:'password length should be atleast 6'};
         next(error);
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      req.body.password = hashedPassword;
      const user = new User(req.body);
      await user.save();
      return res.status(201).json({
         message: 'user created sucessfully'
      });
   } catch (error:unknown) {
      next(error);
   }
}
async function login(req:Request, res:Response, next:NextFunction) {
   try {
      console.log('login method', req.body);
      const password = req.body.password;
      const user = await User.find({ email: req.body.email });

      if (user.length > 0) {
         console.log(user);
         console.log(password + " hashed password " + user[0].password);
         const isMatchPassword = await bcrypt.compare(password, user[0].password);

         console.log('after bcrypt compare');
         if (isMatchPassword) {
            const jwt_token = jwt.sign({ user_id: user[0]._id, user_email: user[0].email },
               secret_key
            );
            return res.status(200).json({
               message: 'login sucess',
               token: jwt_token
            });
         } else {
            const error:{status:number,message:string} = {status:404,message:'email or password are invalid'};
         next(error);
         }
      } else {
         const error:{status:number,message:string} = {status:404,message:'email or password are invalid'};
         next(error);
      }
   } catch (error:unknown) {
      next(error);
   }
}

export { login, register };
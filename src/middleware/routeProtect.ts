import 'dotenv/config';
import jwt  from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';

const secret_key = process.env.SECRET_KEY ?process.env.SECRET_KEY as string:'';
async function isTokenCorrect(req:Request,res:Response,next:NextFunction){
     try{
         const token:string = req.headers.token?req.headers.token as string :'';
         if(token){
             console.log('secret key ',secret_key);
             const isValid = await jwt.verify(token,secret_key);
             console.log(isValid);
             if(isValid){
                next();
             }else{
               const error:{status:number,message:string} = {status:401,message:'Unauthorized credentails'};
               next(error);
             }
         }else{
            const error:{status:number,message:string} = {status:401,message:'Unauthorized credentails'};
            next(error);
         }
     }catch(error:unknown){
        next(error);
     }
}
export default isTokenCorrect;
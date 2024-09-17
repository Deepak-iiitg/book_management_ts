import Book from '../models/bookModels';
import { Request,Response,NextFunction } from 'express';
const limit:number = 10;
async function addBook(req:Request,res:Response,next:NextFunction){
   try{
      console.log('inside addBook method');
      const book = new Book(req.body);
      await book.save();
      return res.status(201).json(book);
   }catch(error:unknown){
     console.log('error occurred'); 
     next(error);
   }
}
async function deleteBook(req:Request,res:Response,next:NextFunction){
    try{
       const book = await Book.find({_id:req.params._id});
       console.log(book);
       if(book.length == 0){
         const error:{status:number,message:string} = {status:404,message:'requested data not found'};
         next(error);
       }
       const delete_book = await Book.deleteOne({_id:req.params._id});
       console.log(book);
       return res.status(200).json(book);
    }catch(error:unknown){
       next(error);
    }
}
async function updateBook(req:Request,res:Response,next:NextFunction){
   try{
      const _id = req.params._id;

        const updatedData = req.body;
        const olderData = await Book.findById(_id);
        if(olderData===null){
         const error:{status:number,message:string} = {status:404,message:'requested data is not found'};
         next(error);
        }
        console.log(olderData);
        const newData = await Book.findByIdAndUpdate(_id, updatedData, { new: true });
        res.status(200).json(newData);
   }catch(error:unknown){
      next(error);
   }
}
async function getAllBook(req:Request,res:Response,next:NextFunction){
   try{
      console.log('get all book api hit');
      const pageNo:number = parseInt(req.params.pageNo);
      console.log(pageNo);
      let skip:number = (pageNo-1)*limit;
      const books = await Book.find().populate('user').skip(skip).limit(limit).sort({publishedDate:-1});
      return res.status(200).json(books);
   }catch(error:unknown){
       next(error);
   }
}
async function filterBookByNameOrAuthorName(req:Request,res:Response,next:NextFunction){
   try{
      let query = req.query;
      console.log(query);
      let pageNo:number = parseInt(req.params.pageNo);
      let skip:number = (pageNo-1)*limit;
      const books = await Book.find(query).populate('user').skip(skip).limit(limit).sort({publishedDate:-1});
      return res.status(200).json(books);
   }catch(error:unknown){
       next(error);
   }
}
async function searchBook(req:Request,res:Response,next:NextFunction){
   try{
      console.log('search api hit');
      let query:string = req.query.author ? req.query.author as string:'';
      console.log(query);
      let pageNo:number = parseInt(req.params.pageNo);
      let skip = (pageNo-1)*limit;
      const results = await Book.find({ author: new RegExp(query, 'i') }).populate('user').skip(skip).limit(limit);
      return res.status(200).json(results);
   }catch(error:unknown){
      next(error);
   }
}
export {addBook,deleteBook,updateBook,getAllBook,filterBookByNameOrAuthorName,searchBook};
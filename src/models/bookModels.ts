import mongoose,{Schema,Document,Model} from 'mongoose';

interface Book extends Document{
    title:string,
    author:string,
    publishedDate:Date,
    user:mongoose.Schema.Types.ObjectId
}

const bookSchema: Schema<Book> = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"please provide the book's title"]
    },
    author: {
        type: String,
        required: [true,"please provide the auther's name"]
    },
    publishedDate: {
        type: Date,
        required: [true,"please provide the book published data"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"please provide the user's id"]
    }
})

const bookModel:Model<Book> = mongoose.model('Book',bookSchema);
export default bookModel;
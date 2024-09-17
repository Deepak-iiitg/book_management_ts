import mongoose, { Document, Schema,Model } from 'mongoose';
interface User extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema: Schema<User> = new Schema({
    name: {
      type: String,
      required: [true, "Please provide user's name"],
    },
    email: {
      type: String,
      required: [true, "Please provide user's email"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please provide user's password"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});


const userModel = mongoose.model<User>('User', userSchema);
export default userModel;
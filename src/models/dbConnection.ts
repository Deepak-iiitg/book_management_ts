import dotenv from'dotenv/config';
import mongoose from 'mongoose';
const url = process.env.DB_URL ?process.env.DB_URL as string :'';

async function main() {
  await mongoose.connect(url);
  console.log('db connected');
}
export default main;
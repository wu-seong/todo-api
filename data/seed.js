import mongoose from 'mongoose';
import { DATABASE_URL } from '../env.js';
import Task from '../models/task.js';
import tasks from './mock.js';
import * as dotenv from 'dotenv';
dotenv.config();

// ...

mongoose.connect(process.dotenv.DATABASE_URL).then(() => console.log('Connected to DB'));

await Task.deleteMany({});
await Task.insertMany(tasks);


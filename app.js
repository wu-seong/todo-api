import express from 'express';
import Task from './models/task.js';
import { DATABASE_URL } from './env.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const corsOption = {
    origin: ['http://127.0.0.1:5500', 'https://my-todo.com']
}
const app = express();
app.use(cors(corsOption));
app.listen(process.env.PORT || 3000, () => console.log('Server Started')
);

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('Connected to DB'));

app.get('/tasks', async (req, res) =>{
    const tasks = await Task.find();
    res.send(tasks);
})
app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(task){
        res.send(task)
    }
    else{
        res.status(400).send({message: 'can not found task'});
    }
});
app.use(express.json()); // body의 json을 파싱해서 자동으로 JS객체로 만들어줌

app.post('/tasks', async (req,res) =>{
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask);
})

app.patch('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(task){
        Object.keys(req.body).forEach( key =>{
            task[key] = req.body[key];
        });
        await task.save();
        res.send(task);
    }
    else{
        res.status(400).send({message: 'can not found task'});
    }
});

app.delete('/tasks/:id', async (req,res) => {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if(deletedTask){
        res.status(204).send(deletedTask);
    }
    else{
        res.status(400).send({message: 'can not found task'});
    }
})
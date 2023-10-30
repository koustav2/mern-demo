import express from 'express';
import { port, mongoDBURL } from './config.js'
import mongoose from 'mongoose';
import cors from 'cors';
import route from './routes/route.js'
const app = express()

// app.use(express.json());
// app.use(cors());


// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )
app.get('/', (req, res) => {
    return res.status(234).send('Hello World!');
});

app.use('/books', route);

try {
    await mongoose.connect(mongoDBURL);
    console.log('App connected to database');
    app.listen(port, () => {
        console.log(`App is listening to port: ${port}`);
    });
} catch (error) {
    console.log(error);
}

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import indexRoute from './routes/index.js';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database connected"))
.catch((error) => console.error(`Error connecting to Database: ${error}`));

// session
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET_KEY,
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             secure: false,
//             maxAge: 1000 * 60 * 60 * 24,
//         },
//         store: MongoStore.create({
//             mongoUrl: process.env.MONGODB_URI,
//             dbName: 'sessionDB',
//         })
//     })
// );

app.use(cors({
    origin: 'https://fb-social-media-clone.vercel.app',
    // origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    cors: true,
    credentials: true
}));

app.use('/api', indexRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () =>{
    console.log(`Server running at port: 3000`);
});

export default app;
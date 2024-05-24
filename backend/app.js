import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import 'dotenv/config';
import indexRoute from './routes/index.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database connected"))
.catch((error) => console.error("Error connecting to Database:", error.message));

// session
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            dbName: 'sessionDB',
        })
    })
);

app.use(cors({
    origin: 'https://fb-social-media-clone.vercel.app',
    // origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use('/api', indexRoute);

app.get("/", (req, res) => {
    // res.send(req.session.user);
    res.send("hello world");
});

app.listen(3000, () =>{
    console.log(`Server running at port: 3000`);
});

export default app;
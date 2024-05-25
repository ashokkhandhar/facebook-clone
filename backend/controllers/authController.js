import { User } from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Token } from '../models/TokenModel.js'

const saltRound = 10;

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(409).send("User with this email already exists");
            }
            if (existingUser.username === username) {
                return res.status(409).send("Username already exists");
            }
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }

    const hashedPassword = bcrypt.hashSync(password, saltRound);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        const response = await newUser.save();
        console.log("New Register: ", response);
        // creating token
        const jwtToken = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
        const newToken = new Token({
            jwtToken,
            userId: user._id,
            userEmail: user.email
        });
        newToken.save()
        .then(() => {
            return res.status(200).send({jwtToken, id: user._id, username: user.username, email: user.email });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json(({message: `Token saving error: ${error}`}));
        });
        // create session
        // req.session.user = { id: newUser._id, username: newUser.username, email: newUser.email };
        // return res.send({ username: newUser.username, email: newUser.email, _id: newUser._id });
    } catch (error) {
        return res.status(500).send("Error while saving user data to database: " + error.message);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found");
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send("Password is incorrect");
        }
        // creating token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
        const newToken = new Token({
            token,
            userId: user._id,
            userEmail: user.email
        });
        newToken.save()
        .then(() => {
            return res.status(200).send({token, id: user._id, username: user.username, email: user.email });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json(({message: `Token saving error: ${error}`}));
        });
        // creating session
        // req.session.user = { id: user._id, username: user.username, email: user.email };
        // return res.status(200).send({ username: user.username, email: user.email, _id: user._id });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export const logout = async (req, res) => {
    // destroy token
    const token = req.headers.authorization;
    try {
        const response = await Token.findOneAndDelete({token});
        console.log(response);
        return res.status(200).send('Logout successfully');
    }
    catch(error) {
        return res.status(500).send(`Error while logout: ${error}`);
    }

    // destroy session
    // req.session.destroy((error) => {
    //     if (error) {
    //         return res.status(500).send("Unable to logout");
    //     }
    //     return res.send("Logout successfully");
    // });
}
import { Token } from "../models/TokenModel.js";
// import { User } from "../models/UserModel.js";
// import jwt from 'jsonwebtoken';

// const verifySession = async (req, res, next) => {
//     if(!req.session || !req.session.user) {
//         return res.status(401).send("Please login");
//     }
    
//     const userId = req.session.user.id;
//     try {
//         const user = await User.findById(userId);
//         if(!user) {
//             return res.status(404).send("User not found for this session id");
//         }
//         next();
//     } catch(error) {
//         return res.status(500).send("error whilt fatching data from database");
//     }
// }
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const tokenDocument = await Token.findOne({token});
        if(!tokenDocument) {
            return res.status(401).send("token invalid");
        }
        req.user = {id: tokenDocument.userId};
        next();
    }
    catch(error) {
        return res.status(401).send(`Error verifying token: ${error}`);
    }
    // const headers = req.headers;
    // if(headers && headers.authorization) {
    //     const jwtToken = headers.authorization[0];
    //     jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (error, decode)=> {
    //         if(error) {
    //             return res.status(401).send("Unauthorized");
    //         }
    //         const userId = decode.id;
    //     });
    // }
    // else {
    //     return res.status(401).send("token is invalid");
    // }
    // next();
}

export default verifyToken;
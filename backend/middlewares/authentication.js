import { User } from "../models/UserModel.js";


const verifySession = async (req, res, next) => {
    console.log(req.session);
    if(!req.session || !req.session.user) {
        return res.status(401).send("Please login");
    }
    
    const userId = req.session.user.id;
    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).send("User not found for this session id");
        }
        next();
    } catch(error) {
        return res.status(500).send("error whilt fatching data from database");
    }
}

export default verifySession;
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //check if the user already exists
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).send({error: 'User already exists'});
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({name, email, password: encryptedPassword});

        //create jwt token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
        );

        //send response
        res.send({
            email: user.email,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //check if the user already exists
        const userExists = await User.findOne({email});
        if(!userExists) {
            return res.status(400).send({error: 'the User does exists'});
        }

        if(!await bcrypt.compare(password, userExists.password)) {
            return res.status(400).send({error: 'Invalid password'});
        }

        //create jwt token
        const token = jwt.sign(
            { user_id: userExists._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        //send response
        res.send({
            email: userExists.email,
            name: userExists.name,
            token
        });

        
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.json({ message: 'Success'})
    } catch (error) {
        console.log(error);
    }
}

export {register, login,logout}
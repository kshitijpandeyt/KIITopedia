// import brycpt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// // REGISTER USER

// export const register = async(req,res)=>{
//     try {
//         const{
//             firstname,
//             lastname,
//             email,
//             password,
//             picturePath,
//             friends,
//             location,
//             occupation
//         } = req.body;

//         // creating a random salt then encrypting the password using that salt
//         const salt = await brycpt.genSalt();
//         const passwordHash = await brycpt.hash(password,salt)

//         // creating new user
//         const newUser = new User({
//             firstname,
//             lastname,
//             email,
//             password : passwordHash,
//             picturePath,
//             friends,
//             location,
//             occupation,
//             viewedProfile: Math.floor(Math.random() * 1000),
//             impressions: Math.floor(Math.random() * 1000)
//         });
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         res.status(500).json({error : err.message})
//     }
// }

// // LOGIN

// export const login = async (req,res)=>
// {
//     try {
//         const {email, password} = req.body;
//     const user= await User.findOne({email:email});
//     if(!user) return res.status(400).json({msg:"User not found."});

//     const isMatch = await brycpt.compare(password,user.password);
//     if(!isMatch) return res.status(400).json({msg:"Invalid Credentials."});

//     const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
//     delete user.password; //so thet password doesnt reach th frontend;

//     res.status(200).json({token,user});
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
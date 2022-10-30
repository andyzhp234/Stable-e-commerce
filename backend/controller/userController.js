import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js';

const verifyPassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword)
}

const hashPassword = async (enteredPassword) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(enteredPassword, salt)
}

// @desc    Auth User and Get JWT Token
// @route   POST /api/users/login
// @access  Public 
const authUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({ email })
    if (user && await verifyPassword(password, user.password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error("Invalid email or Password")
    }
  } catch(error) {
    res.status(401).json({message: error.message})
  }
}


// @desc    Get User Info
// @route   Get /api/users/profile
// @access  Private 
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      throw new Error('User Not Found')      
    }
  } catch(error) {
    res.status(404).json({message: error.message})
  }
}


// @desc    Update User Info
// @route   POST /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = await hashPassword(req.body.password)
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      throw new Error('User Not Found')      
    }
  } catch(error) {
    res.status(404).json({message: error.message})
  }
}


// @desc    Register User 
// @route   Post /api/users
// @access  Public 
const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
      throw new Error('User Already Exists')
    } else {
      const user = await User.create({
        name,
        email,
        password: await hashPassword(password)
      })

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      } else {
        throw new Error('User Not Found')
      }
    }
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
}
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


const protect = async(req, res, next) => {
  let token;
  try {
    if (req.headers.bearer) {
      try {
        token = req.headers.bearer
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
      } catch(error) {
        throw new Error('Not authorized, token failed')
      }
    }
  
    if (!token) {
      throw new Error('Not Authorized, no Token')
    }

    // next if no errors
    next();
  } catch (error) {
    res.status(401).json({message: error.message})
  }

}

export {protect}
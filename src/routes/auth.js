import express from "express";
const router = express.Router()
import * as Joi from 'joi'
import {
    ContainerTypes,
    // Use this as a replacement for express.Request
    ValidatedRequest,
    // Extend from this to define a valid schema type/interface
    ValidatedRequestSchema,
    // Creates a validator that generates middlewares
    createValidator
  } from 'express-joi-validation'
const validator = createValidator()
import {register,login,logout} from "../controllers/auth";


const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
})

router.post('/register', validator.body(registerSchema),register)
router.post('/login', validator.body(loginSchema),login)
router.post('/logout', logout)


export default router
import request from 'supertest'
import app from '..'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../schemas/userSchema.js'
import { token } from 'morgan'


dotenv.config()

const secerete = process.env.JWT_SECRET

describe('user tests',()=>{
    describe('test signup',()=>{
        let user, res;
        it('should not send empty firstname field',async()=>{

            user ={
                firstname:"",
                lastname:"gedeon",
                contact:"0000000000",
                email:"irafasha@gmail.com",
                password:"passwords",
                gender:"M",
                username:"gedeon",
                role:"admin",
            };
            res= await request(app)
            .post('/users/newUser')
            .send(user)
            expect(res.body.Error).toBe('Firstname can not be empty')
        },50000)

        it('should not send empty lastname field',async()=>{

            user ={
                firstname:"gedeon",
                lastname:"",
                contact:"0000000000",
                email:"irafasha@gmail.com",
                password:"passwords",
                gender:"M",
                username:"gedeon",
                role:"admin",
            };
            res= await request(app)
            .post('/users/newUser')
            .send(user)
            expect(res.body.Error).toBe('Lastname can not be empty')
        },50000)

        it('should not send empty email field',async()=>{

            user ={
                firstname:"gedeon",
                lastname:"gedeon",
                contact:"0000000000",
                email:"",
                password:"passwords",
                gender:"M",
                username:"gedeon",
                role:"admin",
            };
            res= await request(app)
            .post('/users/newUser')
            .send(user)
            expect(res.body.Error).toBe('email can not be empty')
        },50000)

        it('should not send empty invalid email',async()=>{

            user ={
                firstname:"gedeon",
                lastname:"gedeon",
                contact:"0000000000",
                email:"irafashagmail.com",
                password:"passwords",
                gender:"M",
                username:"gedeon",
                role:"admin",
            };
            res= await request(app)
            .post('/users/newUser')
            .send(user)
            expect(res.body.Error).toBe('invalid email')
        },50000)

        
        it('should not send empty password field',async()=>{

            user ={
                firstname:"gedeon",
                lastname:"gedeon",
                contact:"0000000000",
                email:"irafasha@gmail.com",
                password:"",
                gender:"M",
                username:"gedeon",
                role:"admin",
            };
            res= await request(app)
            .post('/users/newUser')
            .send(user)
            expect(res.body.Error).toBe('password can not be empty')
        },50000)

        
        it('should not send empty contact field',async()=>{

            user ={
                firstname:"gedeon",
                lastname:"gedeon",
                contact:"",
                email:"irafasha@gmail.com",
                password:"passwords",
                gender:"M",
                username:"gedeon",
                role:"admin",
            };
            res= await request(app)
            .post('/users/newUser')
            .send(user)
            expect(res.body.Error).toBe('contact can not be empty')
        },50000)

        
        it('should not send empty gender field',async()=>{

            user ={
                firstname:"gedeon",
                lastname:"gedeon",
                contact:"0000000000",
                email:"irafasha@gmail.com",
                password:"passwords",
                gender:"",
                username:"gedeon",
                role:"admin",
            };
            res= await request(app)
            .post('/users/newUser')
            .send(user)
            expect(res.body.Error).toBe('gender can not be empty')
        },50000)

        
        it('should not send empty username field',async()=>{

            user ={
                firstname:"gedeon",
                lastname:"gedeon",
                contact:"0000000000",
                email:"irafasha@gmail.com",
                password:"passwords",
                gender:"M",
                username:"",
                role:"admin",
            };
            res= await request(app)
            .post('/users/newUser')
            .send(user)
            expect(res.body.Error).toBe('username can not be empty')
        },50000)

        it('should signup unique user', async()=>{
          
            user ={
                firstname:"gedeon",
                lastname:"gedeon",
                contact:"0000000000",
                email:"irafasha1000@gmail.com",
                password:"passwords",
                gender:"M",
                username:"gedeon",
                role:"admin",
                time:"2022-03-14T16:51:26.613Z"
            };
            res= await request(app)
            .post('/users/newUser')
            .send(user)
            expect(res.body.message).toContain('created succesfully')
        
        }, 500000)

        it('should login existing user login', async()=>{


            user ={
                email:"irafasha1000@gmail.com",
                password:"passwords",
                token:jwt.sign(user,secerete)
            };
           
            res= await request(app)
            .post('/users/login')
            .send(user)
            expect(res.body.token).toBe()
        
        }, 500000)
    })
})



//messages tests

describe('messages tests',()=>{
    let message,res, next;
    it('should not send empty firstname field',async()=>{

        message ={
            firstname:"",
            lastname:"gedeon",
            contact:"00000000",
            email:"irafasha@gmail.com",
            message:"hey"
        };
        res= await request(app)
        .post('/messages/createmessage')
        .send(message)
        expect(res.body.Error).toBe('Firstname can not be empty')
    },50000)


    it('should not send empty lastname field',async()=>{

        message ={
            firstname:"gedeon",
            lastname:"",
            contact:"00000000",
            email:"irafasha@gmail.com",
            message:"hey"
        };
        res= await request(app)
        .post('/messages/createmessage')
        .send(message)
        expect(res.body.Error).toBe('Lastname can not be empty')
    },50000)

         
    it('should not send empty contact field',async()=>{

        message ={
            firstname:"gedeon",
            lastname:"gedeon",
            contact:"",
            email:"irafasha@gmail.com",
            message:"admin",
        };
        res= await request(app)
        .post('/users/newUser')
        .send(message)
        expect(res.body.Error).toBe('contact can not be empty')
    },50000)
    

    it('should not send empty email field',async()=>{

        message ={
            firstname:"gedeon",
            lastname:"gedeon",
            contact:"00000000",
            email:"",
            message:"hey"
        };
        res= await request(app)
        .post('/messages/createmessage')
        .send(message)
        expect(res.body.Error).toBe('email can not be empty')
    },50000)

    it('should not send empty invalid email',async()=>{

        message ={
            firstname:"gedeon",
            lastname:"gedeon",
            contact:"00000000",
            email:"irafashagmail.com",
            message:"hey"
        };
        res= await request(app)
        .post('/messages/createmessage')
        .send(message)
        expect(res.body.Error).toBe('invalid email')
    },50000)

    it('should not send empty message field',async()=>{

        message ={
            firstname:"gedeon",
            lastname:"gedeon",
            contact:"00000000",
            email:"irafasha@gmail.com",
            message:""
        };
        res= await request(app)
        .post('/messages/createmessage')
        .send(message)
        expect(res.body.Error).toBe('message can not be empty')
    },50000)
})


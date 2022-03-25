import request from 'supertest'
import app from '..'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import messageModel from '../schemas/messageSchema.js'
import { token } from 'morgan'
import users from '../schemas/userSchema.js'

import config from '../../config.js'

const {secret} = config 



//messages tests

describe('messages tests',()=>{
    let message,res, token;

    beforeEach(async()=>{
        let user = await{
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

        token = jwt.sign({user:user},secret,{ expiresIn: 60*60})

    })



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
        .post('/newUser')
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


    it('should send  message',async()=>{
        const messageresult= {
            firstname:"gedeon",
            lastname:"gedeon",
            contact:"00000000",
            email:"irafasha@gmail.com",
            message:"hey", 
            Time:Date.now()
        
        
        };
        
        res= await request(app)
        .post('/messages/createmessage')
        .send(messageresult)
        expect(res.body.message).toContain('message')
    },50000)


    it('should read message',async()=>{
        const messageid = '6231b89463936d9e9e452c81';

        const user=jwt.verify(token,secret)

        res=await request(app)
        .get(`/messages/${messageid}`)
        .set('Authorization','Bearer '+ token)
        .expect(200)
        .then()
    },50000)

    it('should get all message',async()=>{

        const user=jwt.verify(token,secret)

        res=await request(app)
        .get(`/messages/`)
        .set('Authorization','Bearer '+ token)
        .expect(200)
        .then()
    },50000)

    it('should delete message',async()=>{
        const messageid = '6231b89463936d9e9e452c81';

        const user=jwt.verify(token,secret)

        res=await request(app)
        .delete(`/messages/deletemessage/${messageid}`)
        .set('Authorization','Bearer '+ token)
        .expect(200)
        .then()
    },50000)
})



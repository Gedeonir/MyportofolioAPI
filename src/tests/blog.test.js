import request from 'supertest'
import app from '..'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import blogModel from '../schemas/blogsSchema.js'
import { token } from 'morgan'
import users from '../schemas/userSchema.js'

import config from '../../config.js'
import { createBlog } from '../controllers/blog_controllers'

const {secret} = config 



//messages tests

describe('blogs tests',()=>{
    let blog,res, token;

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

        blogModel.deleteMany()
    })



    it('should not send empty title field',async()=>{

        blog ={
            title:"",
            body:"gedeon",
        };
        res= await request(app)
        .post('/blogs/createBlog')
        .set('Authorization','Bearer ' + token)
        .send(blog)
        expect(res.body.Error).toBe('title can not be empty')
    },50000)


    it('should not send empty body field',async()=>{

        blog ={
            title:"gedeon",
            body:""
        };
        res= await request(app)
        .post('/blogs/createBlog')
        .set('Authorization','Bearer ' + token)
        .send(blog)
        expect(res.body.Error).toBe('body can not be empty')
    },50000)


    it('should Duplicated blogs',async()=>{

        blog ={
            title:"gedeon",
            body:"gedeon"
        };

        const blogTitle = await blogModel.findOne({title:blog.title});
        if(blogTitle){
            res= await request(app)
            .post('/blogs/createBlog')
            .set('Authorization','Bearer ' + token)
            .send(blog)
            expect(res.body.Error).toBe('Duplicated blogs') 
        }
       
    },50000)

})
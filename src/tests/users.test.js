import request from 'supertest'
import app from '..'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


import users from '../schemas/userSchema.js'

import config from '../../config.js'

const {secret} = config 




describe('user tests',()=>{
    describe('test signup',()=>{
        let user, res;
        beforeEach(async()=>{
           await users.deleteMany()
        })
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
            .post('/newUser')
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
            .post('/newUser')
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
            .post('/newUser')
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
            .post('/newUser')
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
            .post('/newUser')
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
            .post('/newUser')
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
            .post('/newUser')
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
            .post('/newUser')
            .send(user)
            expect(res.body.Error).toBe('username can not be empty')
        },50000)


        it('should signup unique user', async()=>{
          
            user = await{
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
            .post('/newUser')
            .set('Content-type', 'application/json')
            .send(user)
            expect(res.body.message).toContain('created succesfully')
        
        }, 500000)

        let token;

        it('should login existing user login', async()=>{


            user ={
                email:"irafasha1000@gmail.com",
                password:"passwords",
            };
            token=jwt.sign(user,secret)
            res= await request(app)
            .post('/login')
            .send(user)
            expect(res.body.token)
        
        }, 500000) 
    })

    
})


describe('CRUD',()=>{
    let res,token;
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

        users.create(user);

        token = jwt.sign({user:user},secret,{ expiresIn: 60*60})

    },50000)
    it('get(/)',async()=>{

        const userToken = jwt.verify(token,secret);

        res= await request(app)
        .get(`/`)
        .set('Authorization','Bearer '+ token)
        .expect(200)
        .then()

    

    },50000)

    it('should get all user',async()=>{

        const userToken = jwt.verify(token,secret);

        res= await request(app)
        .get('/users')
        .set('Authorization','Bearer '+ token)
        .expect(200)
        .then(expect(409))

    

    },50000) 

    it('should get one user',async()=>{

        const userid ='62386dbf49019438e678ea20'

        const userToken = jwt.verify(token,secret);

        res= await request(app)
        .get(`/users/${userid}`)
        .set('Authorization','Bearer '+ token)
        .expect(200)
        .then()

    

    },50000)

    it('should delete user',async()=>{
        const userid ='62386dbf49019438e678ea20'

        const userToken=jwt.verify(token,secret)

        res=await request(app)
        .delete(`/users/delete/${userid}`)
        .set('Authorization','Bearer '+ token)
        .expect(200)
        .then()
    },50000)

    it('should update user',async()=>{
        const userid ='62386dbf49019438e678ea20'

        const userToken=jwt.verify(token,secret)

        res=await request(app)
        .put(`/users/update/${userid}`)
        .set('Authorization','Bearer '+ token)
        .expect(200)
        .then()
    },50000)


    afterEach(()=>{
        users.deleteMany()
    })
   
})
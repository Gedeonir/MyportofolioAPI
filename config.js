import dotenv from 'dotenv'

dotenv.config()

const config={
    development:{
        port:process.env.DEV_PORT||5000,
        database:process.env.dev_mongoUrl,
        secret:process.env.JWT_SECRET
    },

    test:{
        port:process.env.TEST_PORT||5000,
        database:process.env.test_mongoUrl,
        secret:process.env.JWT_SECRET
    }
}

const currentConfig = config[process.env.NODE_ENV];

export{currentConfig as default}

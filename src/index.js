import express from "express";
import userRouter from "./routes/user_routes.js"
import blogRouter from "./routes/blogs_routes.js"
import messageRouter from "./routes/messages_routes.js"
import projectRouter from "./routes/project_routes.js"
import subscriptionsRouter from "./routes/subscription_router.js"
import skillRouter from "./routes/skills_routes.js"
import commentRouter from "./routes/comments_routes.js"
import mongoose from "mongoose" 
import dotenv from "dotenv"
import helmet from 'helmet'
import morgan from 'morgan'

dotenv.config()
const port = process.env.PORT
 
mongoose.connect(process.env.mongoUrl).then(console.log("database connected "))

const app = express();

app.use(express.json())
app.use(helmet())
app.use(morgan('combined'))
app.use(userRouter)
app.use(blogRouter) 
app.use(messageRouter)
app.use(subscriptionsRouter)
app.use(projectRouter)
app.use(skillRouter)
app.use(commentRouter)




app.listen(port,() =>console.log(`App listening on http://localhost:${port}`)) 

export {app as default}
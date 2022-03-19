import express from "express";
import userRouter from "./routes/user_routes.js"
import blogRouter from "./routes/blogs_routes.js"
import messageRouter from "./routes/messages_routes.js"
import projectRouter from "./routes/project_routes.js"
import subscriptionsRouter from "./routes/subscription_router.js"
import skillRouter from "./routes/skills_routes.js"
import commentRouter from "./routes/comments_routes.js"
import config from '../config.js'
import mongoose from "mongoose"



const {port,database} = config
mongoose.connect(database).then(console.log("database connected "))

const app = express();

app.use(express.json())
app.use(userRouter)
app.use(blogRouter) 
app.use(messageRouter)
app.use(subscriptionsRouter)
app.use(projectRouter)
app.use(skillRouter)
app.use(commentRouter)




app.listen(port,() =>console.log(`App listening on http://localhost:${port}`)) 

export {app as default}
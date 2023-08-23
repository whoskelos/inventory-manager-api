import express from "express";
import usersRoute from "./routes/users.routes.js"
import appRoutes from "./routes/app.routes.js"

const app = express()

app.use(express.json())

app.use(appRoutes)

app.use('/api',usersRoute)

app.listen(3000, () => {
    console.log('Servidor iniciado');
})

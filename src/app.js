import express from "express";
import usersRoute from "./routes/users.routes.js"
import authRoute from "./routes/auth.routes.js"

const app = express()

app.use(express.json())

app.use('/api',usersRoute)
app.use('/api/auth',authRoute)

app.use((req,res, next) => {
    res.status(404).json({
        message: 'Endpoint no encontrado'
    })
})

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
})

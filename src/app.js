import express from "express";
import usersRoute from "./routes/users.routes.js"
import authRoute from "./routes/auth.routes.js"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const app = express()

app.use(express.json())

// * Routes
app.use('/api',usersRoute)
app.use('/api/auth',authRoute)

app.use((req,res, next) => {
    res.status(404).json({
        message: 'Endpoint no encontrado'
    })
})

// * public static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, './static')));

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
})

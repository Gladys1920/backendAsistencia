const express = require('express')
const AlumnosRouter= require('./routes/Alumnos')
const ControlRouter= require('./routes/Control')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
          Alumnos:"/api/v1/Alumnos",
          Control:"/api/v1/Control"
        }
        this.middlewares()
        this.routes()
    }
    routes(){ ','
        //this.app.get('/', (req, res) => {
        //res.send('Mensaje recibido')
       // }) //End point

       this.app.use(this.paths.Alumnos, AlumnosRouter)
       this.app.use(this.paths.Control, ControlRouter)
      
 }
    middlewares(){
        this.app.use(cors())// habilita origen curzado
        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port)
        })
    }
}
module.exports = Server

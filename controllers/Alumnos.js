const{reques, response, request} = require("express")
const pool = require("../db/connection");
const modelsAlumnos = require("../models/Alumnos");


const getAlumnos = async (req = reques, res = response) => {
    let conn;
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const person= await conn.query(modelsAlumnos.queryGetUsers, (error) => {if (error) throw error})

        if(!person){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen Alumnos registrados"})
            return
        }
        res.json({person})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}
const addRegistro = async (req = request, res = response) =>{
    const {Nombre,
           Apellidos,
           Fecha_Entrada,
           Genero,
           Hora_Salida,
           Activo
        } = req.body //URI Params 

    if(!Nombre||
       !Apellidos||
       !Fecha_Entrada||
       !Genero||
       !Hora_Salida||
       !Activo)
{
    res.status(400).json({msg:"Faltan Datos"})
    return
}

let conn;

try{
    conn = await pool.getConnection() //Realizamos la conexion
    
   const [AlumnosExist]= await conn.query(`SELECT Nombre FROM Alumnos WHERE Nombre = '${Nombre}'`)

    if (AlumnosExist){
        res.status(400).json({msg: `Las Asistencias de los  ${Nombre} ya se encuentra registrado.`})
        return 
    }
    //Generamos la consulta
    const result = await conn.query(modelsAlumnos.queryAddUser,[
        Nombre,
           Apellidos,
           Fecha_Entrada,
           Genero,
           Hora_Salida,
           Activo
    ],
        (error) => {if(error) throw error})

   if (result.affectedRows === 0) {//en caso de no haber registros lo informamos
   res.status(400).json({msg: `No se puede agregar el Alumno`})
   }
   res.json({msg: `Se agrego satisfactoriamente el Alumno`})//se manda la lista de usuarios 
   }catch (error){
   console.log(error)
   res.status(500).json({msg: error}) //informamos el error
    } finally{
    if (conn) conn.end() //termina la conexion
}
   
}
const getAlumnByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [Alumnos] = await conn.query(modelsAlumnos.queryGetUsersByID, [id] , (error) => {if (error) throw error})
        console.log(Alumnos)

        if(!Alumnos) { // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen Alumnos con el ID ${id}`})
            return
        }
        res.json({Alumnos})
    }catch (error){
 
        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}
    const deleteCompañerosByID= async (req = request, res = response) =>{
        const {id} = req.params
        let conn
        try{
            conn = await pool.getConnection() //realizamos la conexion
            
            //generamos la consulta
            const result = await conn.query(modelsAlumnos.queryDeleteUsersByID, [id], (error) => {if (error) throw error})
    
            if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
                res.status(404).json({msg: `NO existe Personajes registrados con el ID ${id}`})
                return
            }
    
            res.json({msg:`Se elemino el Personaje con el ID ${id}`})
        }catch (error){
    
            console.log(error)
            res.status(500).json({msg: error}) //informamos del error
        } finally{
            if (conn) conn.end() //termina la conexion
        }


}

module.exports = {getAlumnos, addRegistro, getAlumnByID, deleteCompañerosByID }
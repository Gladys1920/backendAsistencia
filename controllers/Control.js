const{reques, response, request} = require("express")
const pool = require("../db/connection");
const modelsControl = require("../models/Control");


const getControl = async (req = reques, res = response) => {
    let conn;
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const Aula= await conn.query(modelsControl.queryGetUsers, (error) => {if (error) throw error})

        if(!Aula){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen Asignaturas registrados"})
            return
        }
        res.json({Aula})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}
const addRegistro = async (req = request, res = response) =>{
    const {Aula,
           Asignatura,
           Profesor,
           Asistio_clase,
           Activo
        } = req.body //URI Params 

    if(!Aula||
       !Asignatura||
       !Profesor||
       !Asistio_clase||
       !Activo)
{
    res.status(400).json({msg:"Faltan Datos"})
    return
}

let conn;

try{
    conn = await pool.getConnection() //Realizamos la conexion
    
   const [AlumnosExist]= await conn.query(`SELECT Aula FROM Control WHERE Aula = '${Aula}'`)

    if (AlumnosExist){
        res.status(400).json({msg: `Las Asignatura de los  ${Aula} ya se encuentra registrado.`})
        return 
    }
    //Generamos la consulta
    const result = await conn.query(modelsControl.queryAddUser,[
        Aula,
           Asignatura,
           Profesor,
           Asistio_clase,
           Activo
    ],
        (error) => {if(error) throw error})

   if (result.affectedRows === 0) {//en caso de no haber registros lo informamos
   res.status(400).json({msg: `No se puede agregar la Asignatura`})
   }
   res.json({msg: `Se agrego satisfactoriamente la Asignatura`})//se manda la lista de usuarios 
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
        const [Alumnos] = await conn.query(modelsControl.queryGetUsersByID, [id] , (error) => {if (error) throw error})
        

        if(!Alumnos) { // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen Asignatura con el ID ${id}`})
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
            const result = await conn.query(modelsControl.queryDeleteUsersByID, [id], (error) => {if (error) throw error})
    
            if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
                res.status(404).json({msg: `NO existe Asignatura registrados con el ID ${id}`})
                return
            }
    
            res.json({msg:`Se elemino la Asignatura con el ID ${id}`})
        }catch (error){
    
            console.log(error)
            res.status(500).json({msg: error}) //informamos del error
        } finally{
            if (conn) conn.end() //termina la conexion
        }


}

module.exports = {getControl, addRegistro, getAlumnByID, deleteCompañerosByID }
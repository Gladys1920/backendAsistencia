const modelsControl = {
    queryGetUsers: "SELECT * FROM  Control",
    queryGetUsersByID:`SELECT * FROM  Control  WHERE ID = ?`,
    queryDeleteUsersByID: `UPDATE Control SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Control FROM Control WHERE Control = '?'`,
    queryAddUser:
    `INSERT INTO Control(
        Aula, 
        Asignatura,
        Profesor,
        Asistio_clase,
        Activo)VALUES (?,?,?,?,?)`,
    querySignIn: `SELECT  Activo FROM Control WHERE Control = ?`
    }
    
    module.exports = modelsControl
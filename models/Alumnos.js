const modelsAlumnos = {
    queryGetUsers: "SELECT * FROM  Alumnos",
    queryGetUsersByID:`SELECT * FROM  Alumnos  WHERE ID = ?`,
    queryDeleteUsersByID: `UPDATE Alumnos SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Alumnos FROM Alumnos WHERE Alumnos = '?'`,
    queryAddUser:
    `INSERT INTO Alumnos(
        Nombre, 
        Apellidos,
        Fecha_Entrada,
        Genero,
        Hora_Salida,
        Activo)VALUES (?,?,?,?,?,?)`,
    querySignIn: `SELECT  Activo FROM Alumnos WHERE Alumnos = ?`
    }
    
    module.exports = modelsAlumnos
    

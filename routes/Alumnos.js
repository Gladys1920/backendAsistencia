const{Router} = require("express")
const {getAlumnos, addRegistro, getAlumnByID, deleteCompañerosByID} = require("../controllers/Alumnos")
const router = Router()

//http://localhost:4000/api/v1/Alumnos/

//GET
router.get("/", getAlumnos )

//POST
router.post("/", addRegistro)


//GET
router.get("/id/:id", getAlumnByID)

//DELETE
router.delete("/id/:id", deleteCompañerosByID)


module.exports = router

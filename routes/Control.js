const{Router} = require("express")
const {getControl, addRegistro, getAlumnByID, deleteCompañerosByID} = require("../controllers/Control")
const router = Router()

//http://localhost:4000/api/v1/Alumnos/

//GET
router.get("/", getControl )

//POST
router.post("/", addRegistro)


//GET
router.get("/id/:id", getAlumnByID)

//DELETE
router.delete("/id/:id", deleteCompañerosByID)


module.exports = router

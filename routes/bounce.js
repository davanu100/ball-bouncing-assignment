const express = require("express") ;
const router = express.Router() ;
const bounceController = require("../controllers/bounce") ;

//past-results
router.get("/past-results",bounceController.getResults) ;

//calculate the array and coordinates
router.post("/calculate",bounceController.getData) ;

module.exports = router;
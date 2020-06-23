const express = require("express") ;

const bodyParser = require("body-parser") ;
const app = express() ;

app.use(bodyParser.json()) ;

const bounceRoutes = require("./routes/bounce") ;

app.use( (req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","OPTIONS,GET,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers","Content-Type , Authorization");
    next() ;
});

app.use(bounceRoutes);

app.listen(3000);
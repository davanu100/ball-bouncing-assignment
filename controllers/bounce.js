const fs = require("fs") ;
const path = require("path") ;

const savePath = path.join(__dirname,"..","data","previousResults.json") ;

exports.getResults = (req,res,next) => {
    fs.readFile(savePath,(error,fileContent) => {
        results = [];
        if(!error){
            results = JSON.parse(fileContent) ;
        }
        res.status(200).json({
            data : results,
            msg : "old results fetched!!"
        });
    });
};

exports.getData = (req,res,next) => {
    
    const h = req.body.givenHeight; //initial height
    const e = req.body.restitution; //coefficient Of Restitution
    const coordinates = [] ; //arrayof coordinates
    coordinates.push([0,h.toFixed(2)]);
    
     
    const g = 10 ;//gravity 9.8 ~ 10
    let noOfBounces = 0 ;
    let v = Math.sqrt(2*g*h) ; //velocity
    let t = v/g ; //time t
    let curHeight;

    if( e >= 1 ){
        return res.status(200).json({
            message : "error in data provided!!"
        });
    }
    if( h > 0 ){
        coordinates.push([t.toFixed(2),0]);
        noOfBounces += 1 ;
    }

    v = e*v;

    while( v >= 1.00  ){
        
        curHeight = ( v*v )/(2*g);
        t += v/g ;
        coordinates.push([t.toFixed(2),curHeight.toFixed(2)]) ;

        t += (v/g) ;
        coordinates.push([t.toFixed(2),0]) ;
        
        noOfBounces += 1 ;
        
        v = e*v ;
    }

    res.status(201).json({
        data : {
            noOfBounces : noOfBounces,
            coordinates : coordinates
        }
    })

    fs.readFile(savePath,(error,fileContent) => {
        results = [] ;
        if(!error){
            results = JSON.parse(fileContent) ;
        }
        results.push({
            h : h,
            e : e ,
            noOfBounces : noOfBounces,
            coordinates : coordinates
        })

        fs.writeFile(savePath,JSON.stringify(results) , error => {
            console.log(error) ;
        }) ;
    })
};
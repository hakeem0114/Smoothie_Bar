const jwt = require('jsonwebtoken') //Create cookies


//Create a new custom middleware
    //Checks authentication status
const requireAuth = (req, res, next)=>{ //middlwares always have those 3 arguments
    const token = req.cookies.jwt //jwt from browser>application

    //Check if JWT (JSON Web TOken) exists & if verified
    if(token){
        jwt.verify(token, 'hakeem secret', (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next() // Move onto next middleware in App.js after cookie parser middleware
                      //which is /home & /smoothies
            }
        })
    }else{
        //No token so redirect to login page
        res.redirect('/login')
    }
}

module.exports = requireAuth
//Controls callback function for authRoutes

module.exports.signup_get = (req,res) =>{
    res.render('signup') //render signup.ejs
}

module.exports.login_get = (req,res) =>{
    res.render('login')
}

module.exports.signup_post = (req,res) =>{
    res.send('new signup') //Send text to screen
}

module.exports.login_post = (req,res) =>{
    res.send('new signup')  //Send text to screen
}
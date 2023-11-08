
module.exports = (req, res, next) => {
    let user = null;
    let admin = null;
    if (!req.cookies) {
        next();
    }
    else{
        const userRole = req.cookies.userRole;
        const token = req.cookies.token;
        if (userRole==='admin') {
            res.app.locals.userRole = 'admin';
        }
        if (userRole==='user') {
            res.app.locals.userRole = 'user';
        }
    }


    // do something with token
    console.log(`User role: ${userRole}, Token: ${token}`);
    next();
};

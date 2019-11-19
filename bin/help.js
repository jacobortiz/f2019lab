  
module.exports = function(req, res, next) {
    console.log('inside mw 3A')
    res.send(`HELP FROM MODULE!`)
    next();
}
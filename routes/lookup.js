const express = require('express');
const router = express.Router();

const userNames = ["eddy", "ted", "teddy", "eddie", "edward"];

/* 
 * GET users listing. 
 * example: /lookup/username/jasonh?checkIsValid=true
 */
router.get('/username/:name', function(req, res, next) {
    //console.log(req.params.name, 'should check is valid?', req.query.checkIsValid);
    
    if (userNames.includes(req.params.name)) {
        res.status(200).json({
            name: req.params.name,
            status: 'Unavailable'
        });
    }
    else {
        res.status(200).json({
            name: req.params.name,
            status: 'Available'
        });
    }
});

module.exports = router;
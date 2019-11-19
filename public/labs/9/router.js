var express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes', function(req, res, next) {
    
    const keyword = req.query.k;
    
    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'xilg924lwjugbvxo',
        password: 'xr9u6eh6vacb89xw',
        database: 'to40c4q9kr08chkl'
    });

    connection.connect();

    connection.query(`
SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName 
FROM l9_quotes q INNER JOIN
l9_author a ON q.authorId = a.authorId
WHERE q.quote LIKE '${keyword}' 
OR a.firstName LIKE '${keyword}'
    `, (error, results, fields) => {
        if (error) throw error;

        res.render('../public/labs/9/index', {
            title: 'Jason\'s Lab 9',
            quotes: results
        });
    });

    connection.end();

});

module.exports = router;
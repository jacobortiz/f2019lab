var express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes', function(req, res, next) {
    
    const keyword = req.query.k;
    
    const connection = mysql.createConnection({
        host:       'bfjrxdpxrza9qllq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user:       's3r4i1e1wxsw844i',
        password:   'd05nbbxmn9v8fnm0',
        database:   'wigtng4xxhrfmiba'
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
            title: 'jacob\'s Lab 9',
            quotes: results
        });
    });

    connection.end();

});

module.exports = router;
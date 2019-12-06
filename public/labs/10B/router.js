var express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

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

router.get('/quotes/edit', function(req, res, next) {

    const id = req.query.id;

    if (id) {
        let results = {};
        
        
        const sql
        

        res.render('../public/labs/10/edit', {
            title: 'Edit Quote',
            data: results
        });
    } else {
        res.render('../public/labs/10/edit', {
            title: 'Add Quote',
        });
    }
});

router.post('/quotes/edit', function(req, res, next) {

    const connection = mysql.createConnection({
        host:       'bfjrxdpxrza9qllq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user:       's3r4i1e1wxsw844i',
        password:   'd05nbbxmn9v8fnm0',
        database:   'wigtng4xxhrfmiba'
    });

    connection.connect();
    
    if(req.body.quoteId) {
        connection.query(
            'UPDATE l9_quotes SET authorId = ?, quote = ?, category = ? where quoteId = ?',
            )
    }

    connection.query(
        
        'INSERT INTO l9_quotes(authorId, quote, category) VALUES (?, ?, ?)', 
        [req.body.authorId, req.body.quote, req.body.category], // assuming POST
        (error, results, fields) => {
            if (error) throw error;
            res.json({
                id: results.insertId
            });
        });

    connection.end();
});

module.exports = router;
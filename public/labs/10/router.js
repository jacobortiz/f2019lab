var express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');



router.get('/edit', function(req, res, next) {

    const id = req.query.id;

    if (id) {
        let results = {};
        // TODO: Lookup the data and provide results to the view 
        // to show an existing quote

        res.render('../public/labs/10/edit', {
            title: 'Jacob\'s Lab 10',
            data: results
        });
    } else {
        res.render('../public/labs/10/edit', {
            title: 'Jacob\'s Lab 10',
        });
    }
});

router.post('/edit', function(req, res, next) {

    const connection = mysql.createConnection({
        host:       'bfjrxdpxrza9qllq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user:       's3r4i1e1wxsw844i',
        password:   'd05nbbxmn9v8fnm0',
        database:   'wigtng4xxhrfmiba'
    });

    connection.connect();

    connection.query(
        // structure should be the same for adding anything or deleting
        
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
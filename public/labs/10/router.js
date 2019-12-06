var express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes', function(req, res, next) {
    const sql = `
    SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName
    FROM l9_quotes q INNER JOIN
    l9_author a ON q.authorId = a.authorId
    `;
    
    const connection = mysql.createConnection({
        host:       'bfjrxdpxrza9qllq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user:       's3r4i1e1wxsw844i',
        password:   'd05nbbxmn9v8fnm0',
        database:   'wigtng4xxhrfmiba'
    });
    
    connection.connect();
    
    connection.query(sql, (error, results, fields) => {
        if(error) {
            throw error;
        }
        
        res.render('../public/labs/10/index', {
            title: 'Quote Manager List',
            quotes: results
        });
    });
    
    connection.end();
});

router.get('/quotes/edut', function(req, res, next) {
   const id = req.query.id;
   if(id) {
       
       const sql = `
       SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName
       FROM l9_quotes q INNER JOIN
       l9_author a ON q.authorId = a.authorId
       WHERE q.quoteId = ?
       `;
       
       const connection = mysql.createConnection({
           host:       'bfjrxdpxrza9qllq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user:       's3r4i1e1wxsw844i',
            password:   'd05nbbxmn9v8fnm0',
            database:   'wigtng4xxhrfmiba'
       });
       
       connection.connect();
       
       connection.query(sql, [id], (error, results, fields) => {
           if(error) {
               throw error;
           }
           
           res.render('../public/labs/10/edit', {
               title: 'Edit Quote',
               data: results[0] // get first element of results
           });
       });
       
       connection.end();
   } else {
       res.render('../public/labs/10/edit', {
           title: 'Add Quote',
           data: {}
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
        'UPDATE l9_quotes SET authorId = ?, quote = ?, category = ? WHERE quoteId = ?', 
        [req.body.authorId, req.body.quoteId, req.body.category, req.body.quoteId],
        (error, results, fields) => {
           if(error) {
               throw error;
           } 
           res.json({
               id: results.quoteId
           });
        });
    } else {
        connection.query(
            'INSERT INTO l9_quotes(authorId, quote, category) VALUES (?, ?, ?)',
            [req.body.authorId, req.body.quote, req.body.category],
            (error, results, fields) => {
                res.json({
                    id: results.insertId
                });
            });
    }
    connection.end();
});

router.get('/quotes/delete', function(req, res, next) {
    const id = req.query.id;
    
    if(!id || id.length === 0) {
        return next(new Error('nothing to delete'));
    }
    // look up results to show existing quotes
    
    const sql = `
    SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName
    FROM l9_quotes q INNER JOIN
    l9_author a ON q.authorId = a.authorId
    WHERE q.quoteId = ?
    `;
    
    const connection = mysql.createConnection({
        host:       'bfjrxdpxrza9qllq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user:       's3r4i1e1wxsw844i',
        password:   'd05nbbxmn9v8fnm0',
        database:   'wigtng4xxhrfmiba'
    });
    
    connection.connect();
    
    connection.query(sql, [id], (error, results, fields) => {
        if(error) {
            throw error;
        }
        
        res.render('../public/labs/10/delete', {
            title: 'Confirm Delete',
            data: results[0] 
        });
    });
    
    connection.end();
});

router.delete('/quote/delete', function(req, res, next) {
   if(!req.body.quoteId || req.body.quoteId.length === 0) {
       return next(new Error('nothing to delete'));
   }
   
   const connection = mysql.createConnection({
        host:       'bfjrxdpxrza9qllq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user:       's3r4i1e1wxsw844i',
        password:   'd05nbbxmn9v8fnm0',
        database:   'wigtng4xxhrfmiba'
   });
   
   connection.connect();
   
   connection.query(
       'DELETE FROM l9_quotes WHERE quoteId = ?', [req.body.quoteId],
       (error, results, fields) => {
           if(error) {
               throw error;
           }
           
           res.json({
               id: results.quoteId
           });
       });
       
       connection.end();
});

module.exports = router;
var express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

router.get('/quotes', function(req, res, next) {
    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'xilg924lwjugbvxo',
        password: 'xr9u6eh6vacb89xw',
        database: 'to40c4q9kr08chkl'
    });

    connection.connect();

    connection.query('SELECT quoteId AS \'id\', quote FROM l9_quotes', (error, results, fields) => {
        if (error) throw error;

        res.render('../public/examples/mysql/quotes', {
            title: 'Jason\'s Quotes',
            quotes: results
        });
    });

    connection.end();

});

/* GET home page. */
router.get('/', function(req, res, next) {
    const connection = mysql.createConnection({
        host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'xilg924lwjugbvxo',
        password: 'xr9u6eh6vacb89xw',
        database: 'to40c4q9kr08chkl'
    });

    connection.connect();

    connection.query('SELECT 41 + 1 AS answer', (error, results, fields) => {
        if (error) throw error;
        console.log('The answer is: ', results[0].answer);

        res.render('../public/examples/mysql/index', {
            title: 'Jason\'s Big Time Question',
            answer: results[0].answer
        });
    });

    connection.end();

});

module.exports = router;
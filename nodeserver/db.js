const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sqlite.db');
const url = require('url');

const hostname = '127.0.0.1';
const port = 64209;

http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    };

    var q = url.parse(req.url, true).query;
        console.log('Request Received: '+req.url);
        
        if(url.parse(req.url, false).pathname != '/')
        {
            console.log('Request Dropped: Invalid path\n');
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Request Dropped: Invalid path\n');
            return;
        }

        var query = ' ID>=0';
        var minar = 0;
        var maxar = 20000000;

        if(q.nev != undefined) query += ' AND Nev LIKE "%'+q.nev+'%"';
        if(q.minar != undefined) minar = parseInt(q.minar);
        if(q.maxar != undefined) maxar = parseInt(q.maxar);
        if(q.leiras != undefined) query += ' AND Leiras LIKE "%'+q.leiras+'%"';
        if(q.cikkszam != undefined) query += ' AND Cikkszam LIKE "%'+q.cikkszam+'%"';

        query += ' AND Ar>='+minar+' AND Ar<='+maxar;

        res.writeHead(200, headers);
        console.log('SELECT * FROM demo WHERE'+query);

        db.all('SELECT * FROM demo WHERE'+query, (err, rows) => {
            console.log('Request Approved');
            res.end(''+JSON.stringify(rows));
        });
    
}).listen(port);
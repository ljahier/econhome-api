module.exports = (app, ejs, fs, mysql, crypto) => {
    // create the connection to database
    const connection = mysql.createConnection({
        host: 'bjowbrtr2vxn5ayw1toe-mysql.services.clever-cloud.com',
        user: 'ucsp60dhtoagqt4d',
        database: 'bjowbrtr2vxn5ayw1toe',
        password: 'kFmmZjv7OGHc3AJUVwa9'
    });

    // simple query
    connection.query(
        'SELECT * FROM `data`',
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
    // let config = require('../config.json');
    // let connection  = mysql.createConnection({
    //     connectionLimit : 5,
    //     host            : "bjowbrtr2vxn5ayw1toe-mysql.services.clever-cloud.com",
    //     user            : "ucsp60dhtoagqt4d",
    //     password        : "kFmmZjv7OGHc3AJUVwa9",
    //     database        : "bjowbrtr2vxn5ayw1toe",
    // });
    //
    // app.get('/', (req, res) => {
    //     res.json({"data": "2222"})
    // })
    //
    // app.get('/login', (req, res) => {
    //     res.render('pages/login/index')
    // })
    //
    // // app.post('/login', (req, res) => {
    // //     let formPassword = crypto.createHmac('sha256', req.body.password);
    // //     connection.query('SELECT * FROM users WHERE password = ?', formPassword, function (error, results, fields) {
    // //         if (error) throw error;
    // //         console.log(results);
    // //     });
    // // })
    //
    // app.get('/water/:data', (req, res) => {
    //     res.send();
    //     let sensorData = {sensor: "water", data: req.params.data}
    //
    //     connection.execute(
    //         'INSERT INTO data SET ?',
    //         sensorData,
    //         function(err, results, fields) {
    //             console.log(err);
    //             console.log(results);
    //             console.log(fields);
    //         }
    //     );
    // })
    //
    // app.get('/temperature/:data', (req, res) => {
    //     res.send(req.params.data);
    // })
    //
    // app.get('/lightning/:data', (req, res) => {
    //     fs.writeFile('data.txt', req.params.data, (err) => {
    //         if (err) throw err;
    //         res.send(req.params.data);
    //     });
    // })
}

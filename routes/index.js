module.exports = (app, ejs, fs, mysql, crypto) => {
    let connection;

    try {
        let config = require('./config.json');
        pool  = mysql.createPool({
            connectionLimit : 5,
            host            : config.database.user,
            user            : config.database.user,
            password        : config.database.password,
            database        : config.database.host
        });
    } catch (e) {
        pool  = mysql.createPool({
            connectionLimit : 5,
            host            : process.env.MYSQL_ADDON_USER,
            user            : process.env.MYSQL_ADDON_USER,
            password        : process.env.MYSQL_ADDON_PASSWORD,
            database        : process.env.MYSQL_ADDON_DB
        });
    }

    app.get('/', (req, res) => {
        fs.readFile('data.txt', (err, data) => {
            if (err) throw err;

            res.render('pages/index', {
                data: data
            })
        });
    })

    // Login
    app.get('/login', (req, res) => {
        res.render('pages/login/index')
    })

    app.post('/login', (req, res) => {
        let formPassword = crypto.createHmac('sha256', req.body.password);
        pool.query('SELECT * FROM users WHERE password = ?', formPassword, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
        });
    })

    app.get('/water/:data', (req, res) => {
        res.send();
        let sensorData = {sensor: "water", data: req.params.data}
        // execute will internally call prepare and query
        pool.execute(
            'INSERT INTO data SET ?',
            sensorData,
            function(err, results, fields) {
                console.log(err);
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available
            }
        );
    })

    app.get('/temperature/:data', (req, res) => {
        res.send(req.params.data);
    })
    app.get('/lightning/:data', (req, res) => {
        fs.writeFile('data.txt', req.params.data, (err) => {
            if (err) throw err;
            res.send(req.params.data);
        });
    })
}

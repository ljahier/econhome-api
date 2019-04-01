module.exports = (app, ejs, fs, mysql, crypto) => {

    connection = mysql.createConnection({
        host: process.env.MYSQL_ADDON_HOST,
        user: process.env.MYSQL_ADDON_USER,
        database: process.env.MYSQL_ADDON_DB,
        password: process.env.MYSQL_ADDON_PASSWORD,
        port: process.env.MYSQL_ADDON_PORT
    });

    function getDateTime() {
        let date = new Date();
        let hour = date.getHours();
        let min  = date.getMinutes();
        let sec  = date.getSeconds();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day  = date.getDate();

        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;
        sec = (sec < 10 ? "0" : "") + sec;
        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        
        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    }

    app.get('/', (req, res) => {
        connection.query(
            'SELECT * FROM `data`',
            function (err, results) {
                res.json(results)
            }
        );
    })

    app.get('/water/:data', (req, res) => {
        let sensorData = { sensor: `water`, data: `${req.params.data}`, created_at: `${getDateTime()}` }
        connection.query(`INSERT INTO data SET ?`, sensorData, () => {
            res.end('Data insert on database');
        });
        console.log(connection.sql);
    })

    app.get('/water', (req, res) => {
        res.send('Pouet');
    })

    app.get('/temperature/:data', (req, res) => {
        let sensorData = { sensor: `temperature`, data: `${req.params.data}`, created_at: `${getDateTime()}` }
        connection.query(`INSERT INTO data SET ?`, sensorData, () => {
            res.end('Data insert on database')
        });
    })

    app.get('/temperature', (req, res) => {
        res.send('Pouet');
    })

    app.get('/lightning/:data', (req, res) => {
        let sensorData = { sensor: `lightning`, data: `${req.params.data}`, created_at: `${getDateTime()}` }
        connection.query(`INSERT INTO data SET ?`, sensorData, () => {
            res.end('Data insert on database')
        });
    })
    app.get('/lightning', (req, res) => {
        res.send('Pouet');
    })
}
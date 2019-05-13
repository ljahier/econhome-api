module.exports = (app, ejs, fs, mysql, crypto) => {

    let connection = mysql.createConnection({
        host: process.env.MYSQL_ADDON_HOST,
        user: process.env.MYSQL_ADDON_USER,
        database: process.env.MYSQL_ADDON_DB,
        password: process.env.MYSQL_ADDON_PASSWORD,
        port: process.env.MYSQL_ADDON_PORT
    });

    function getDateTime() {
        let date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;
        sec = (sec < 10 ? "0" : "") + sec;
        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;

        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    }

    app.get('/', (req, res) => {
        connection.query(
            "SELECT * FROM `data`",
            function (err, results) {
                res.json(results)
            }
        );
    })

    app.get('/water', (req, res) => {
        connection.query(
            "SELECT * FROM `data` WHERE sensor = 'water'",
            function (err, results) {
                res.json(results)
            }
        );
    })

    app.get('/temperature', (req, res) => {
        connection.query(
            "SELECT * FROM `data` WHERE sensor = 'temperature' ORDER BY id DESC LIMIT 15",
            function (err, results) {
                res.json(results)
            }
        );
    })

    app.get('/lightning', (req, res) => {
        connection.query(
            "SELECT * FROM `data` WHERE sensor = 'lightning'",
            function (err, results) {
                res.json(results)
            }
        );
    })

    app.get('/water/:data', (req, res) => {
        let dataParam = req.params.data
        if (isNaN(dataParam)) res.end('You must enter a number in data url')
        let sensorData = { sensor: `water`, data: `${req.params.data}`, created_at: `${getDateTime()}` }
        connection.query('INSERT INTO `data` SET ?', sensorData, () => {
            res.end('Data insert on database');
        });
    })

    app.get('/temperature/:data', (req, res) => {
        let dataParam = req.params.data
        if (isNaN(dataParam)) res.end('You must enter a number in data url')
        let sensorData = { sensor: `temperature`, data: `${req.params.data}`, created_at: `${getDateTime()}` }
        connection.query('INSERT INTO `data` SET ?', sensorData, () => {
            res.end('Data insert on database')
        });
    })

    app.get('/lightning/:data', (req, res) => {
        let dataParam = req.params.data
        if (isNaN(dataParam)) res.end('You must enter a number in data url')
        let sensorData = { sensor: `lightning`, data: `${req.params.data}`, created_at: `${getDateTime()}` }
        connection.query('INSERT INTO `data` SET ?', sensorData, () => {
            res.end('Data insert on database')
        });
    })

    app.post('/ordre', (req, res) => {
        let dataParse = parseInt(req.body.data)
        if (dataParse === 22) {
            let sensorData = { grade: `confort`, temperature: `${dataParse}`, created_at: `${getDateTime()}` }
            connection.query('INSERT INTO `temperature` SET ?', sensorData, () => {
                res.end('Data insert on database')
            });
        }

        if (dataParse === 19) {
            let sensorData = { grade: `normal`, temperature: `${dataParse}`, created_at: `${getDateTime()}` }
            connection.query('INSERT INTO `temperature` SET ?', sensorData, () => {
                res.end('Data insert on database')
            });
        }

        if (dataParse === 17) {
            let sensorData = { grade: `economique`, temperature: `${dataParse}`, created_at: `${getDateTime()}` }
            connection.query('INSERT INTO `temperature` SET ?', sensorData, () => {
                res.end('Data insert on database')
            });
        }
    })

    app.get('/users/temperature', (req, res) => {
        connection.query(
            "SELECT * FROM `temperature` ORDER BY id DESC LIMIT 1",
            function (err, results) {
                res.json(results)
            }
        );
    })
}
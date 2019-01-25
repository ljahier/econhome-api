module.exports = (app, ejs, fs) => {
    app.get('/', (req, res) => {
        fs.readFile('data.txt', (err, data) => {
            if (err) throw err;
            console.log(data)
            res.render('pages/index', {
                data: data
            })
        });

    })
    app.get('/water/:data', (req, res) => {
        res.send(req.params.data);
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

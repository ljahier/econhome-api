module.exports = (app, ejs, fs) => {
    app.get('/', (req, res) => {
        fs.readFile('message.txt', (err, data) => {
            if (err) throw err;
            res.render('pages/index', [
                data = data
            ])
        });

    })
    app.get('/water/:data', (req, res) => {
        res.send(req.params.data);
    })
    app.get('/temperature/:data', (req, res) => {
        res.send(req.params.data);
    })
    app.get('/lightning/:data', (req, res) => {
        res.send(req.params.data);
        fs.writeFile('message.txt', req.params.data, (err) => {
            if (err) throw err;
        });
    })
}

module.exports = (app) => {
    app.get('/water/:data', (req, res) => {
        res.send(req.params.data);
    })
    app.get('/temperature/:data', (req, res) => {
        res.send(req.params.data);
    })
    app.get('/lightning/:data', (req, res) => {
        res.send(req.params.data);
    })
}
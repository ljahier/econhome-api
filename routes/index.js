module.exports = (app) => {
    app.get('/', (req, res) => {
      res.render('pages/index', [
          username = "Lucas"
      ])
    })
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

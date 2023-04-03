module.exports = (app) => {
    app.use("/api/user", require('./authentication/authentication.route'))
}

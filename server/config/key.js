// Setting up the dev/production mode so we can secure the private data when it is deployed.
if(process.env.NODE_ENV === "production"){
    module.exports = require('./prod')
}else {
    module.exports = require('./dev')
}
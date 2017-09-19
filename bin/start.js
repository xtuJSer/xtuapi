const app = require('../app')
const { port } = require('../config')

app.listen(port)
console.log(`app started at port ${port}...\n`)

const app = require('../app')
const { port } = require('../config')

app.listen(port)

console.clear()
console.log(`App Started At Port ${port}...\n`)

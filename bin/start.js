const app = require('../build/app')
const { port } = require('../build/config')

app.listen(port)

console.clear()
console.log(`App Started At Port ${port}...\n`)

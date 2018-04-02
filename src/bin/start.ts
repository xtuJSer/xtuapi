import app from '../app'
import config from '../config'

const { port } = config

app.listen(port)

console.clear()
console.log(`App Started At Port ${port}...`)
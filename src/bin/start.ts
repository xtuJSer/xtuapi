import app from '../app'
import config from '../config'

app.listen(config.port)

console.clear()
console.log(`App Started At Port ${config.port}...`)

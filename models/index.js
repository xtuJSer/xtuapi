const mongoose = require('mongoose')
const config = require('../config/default')

mongoose.connect(config.db)


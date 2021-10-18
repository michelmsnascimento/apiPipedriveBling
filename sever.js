const express = require('express')
const bodyParser = require('body-parser')
const cors = require ('cors')
const connectDatabase = require('./src/services/initialezeDatabase')

require('./src/model/DealSchema')
const server = express()
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

connectDatabase();

server.use('/api/v1', require('./src/routes'))

server.listen(8080, () => {console.log(`Servidor rodando na porta 8080!`)})
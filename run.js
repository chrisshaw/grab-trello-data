const config = require('./config.js')
const Trello = require('node-trello')
const productBoardId = 'V9Zv34WQ'

const trello = new Trello(config.key, config.token)

const results = trello.get(`/1/boards/${productBoardId}/actions`)
console.log(JSON.stringify(results, null, 4))
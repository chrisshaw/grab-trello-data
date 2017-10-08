const fs = require('fs')
const json2csv = require('json2csv')
const config = require('./config.js')
const Trello = require('node-trello')
const productBoardId = 'V9Zv34WQ'

const trello = new Trello(config.key, config.token)

const run = () => {
    const getListActivity = id => {
        trello.get(
            `/1/boards/${productBoardId}/actions`,
            { fields: "date,type,memberCreator,data", memberCreator_fields: "username", filter: "updateCard:idList", actions_entities: true },
            (err, data) => {
                if (err) throw err
                const csvData = data.map( action => {
                    return {
                        timestamp: action.date,
                        card: action.data.card.name,
                        endList: action.data.listBefore.name,
                        startList: action.data.listAfter.name,
                        teamMember: action.memberCreator.username
                    }
                })
                const csv = json2csv({ data: csvData })
                console.log(csvData)
                fs.writeFile(`${__dirname}/movesToLists.csv`, csv, (err) => {
                    if (err) throw err
                    console.log('Success.')
                })
            }
        )
    }
}

run()
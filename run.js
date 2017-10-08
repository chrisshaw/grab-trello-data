const fs = require('fs')
const json2csv = require('json2csv')
const config = require('./config.js')
const Trello = require('node-trello')

const trello = new Trello(config.key, config.token)


const getListActivity = id => {
    trello.get(
        `/1/boards/${id}/actions`,
        { fields: "date,type,memberCreator,data", memberCreator_fields: "username", filter: "updateCard:idList", actions_entities: true },
        (err, data) => {
            if (err) throw err
            const csvData = data.map( action => {
                return {
                    timestamp: action.date,
                    cardId: action.data.card.id,
                    card: action.data.card.name,
                    startList: action.data.listBefore.name,
                    endList: action.data.listAfter.name,
                    teamMember: action.memberCreator.username
                }
            })
            const csv = json2csv({ data: csvData })
            console.log(csv)
            fs.writeFile(`${__dirname}/movesToLists.csv`, csv, (err) => {
                if (err) throw err
                console.log('Success.')
            })
        }
    )
}

getListActivity('V9Zv34WQ')
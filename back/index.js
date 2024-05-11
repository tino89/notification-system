const app = require('./app')
const port = 3001

const initDataBase = require('./database/databaseConfig');
initDataBase();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




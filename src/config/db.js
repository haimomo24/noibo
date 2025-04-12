const sql = require('mssql')

const config = {
  user: 'sa',
  password: '123456a@',
  server: '113.160.202.36',
  port: 1999,
  database: 'maildb',
  options: {
    trustServerCertificate: true,
    encrypt: false
  }
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to maildb successfully!')
    return pool
  })
  .catch(err => {
    console.log('Database Connection Failed! Error:', err)
    throw err
  })

module.exports = {
  sql,
  poolPromise
}

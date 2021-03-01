const { listTheaters } = require("./theaters.services")

async function list(req, res) {
  const data = await listTheaters()
  res.json({ data })
}

module.exports = {
  list,
}
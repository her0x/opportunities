const { send } = require("micro")

const exchanges = require("./exchanges/list")
const fetchOpportunities = require("./opportunities/fetch")

module.exports = async (_, response) => {
  const opportunities = await fetchOpportunities(exchanges)
  send(response, 200, opportunities)
}

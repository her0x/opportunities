const { send } = require("micro")
const flatten = require("lodash/flatten")

const fpMapValues = require("lodash/fp/mapValues")
const fpGroupBy = require("lodash/fp/groupBy")
const fpOmitBy = require("lodash/fp/omitBy")
const compose = require("lodash/fp/compose")

const fetch0xMarkets = require("./0x/fetchMarkets")
const formartDDEXMarkets = require("./ddex/formatMarkets")
const formartRadarRelayMarkets = require("./radarRelay/formatMarkets")

const exchanges0x = [
  {
    name: "RadarRelay",
    url: "api.radarrelay.com",
    formatter: formartRadarRelayMarkets
  },
  { name: "DDEX", url: "api.ddex.io", formatter: formartDDEXMarkets }
]

const fetchMarkets = async exchanges => {
  const fetches = exchanges.map(({ url, formatter }) =>
    fetch0xMarkets(url, formatter)
  )
  const markets = await Promise.all(fetches)
  return flatten(markets)
}

const mapMarketsToOpportunities = compose(
  fpOmitBy(markets => markets.length < 2),
  fpGroupBy(market => `${market.quoteToken}_${market.baseToken}`)
)

module.exports = async (request, response) => {
  const markets = await fetchMarkets(exchanges0x)
  const opportunities = mapMarketsToOpportunities(markets)
  send(response, 200, opportunities)
}

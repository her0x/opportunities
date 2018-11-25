const flatten = require("lodash/flatten")

const fpGroupBy = require("lodash/fp/groupBy")
const fpOmitBy = require("lodash/fp/omitBy")
const compose = require("lodash/fp/compose")

const fetchExchangeMarkets = require("../exchanges/fetchMarkets")

const fetchMarkets = async exchanges => {
  const fetches = exchanges.map(({ url, formatter }) =>
    fetchExchangeMarkets(url, formatter)
  )
  const markets = await Promise.all(fetches)
  return flatten(markets)
}

const mapMarketsToOpportunities = compose(
  fpOmitBy(markets => markets.length < 2),
  fpGroupBy(market => `${market.quoteToken}_${market.baseToken}`)
)

module.exports = async exchanges => {
  const markets = await fetchMarkets(exchanges)
  return mapMarketsToOpportunities(markets)
}

module.exports = (markets = []) =>
  markets.map(market => {
    const [quoteToken, baseToken] = market.id.split("-")
    return {
      quoteToken,
      baseToken,
      exchange: "RadarRelay",
      href: `https://app.radarrelay.com/${market.displayName}`
    }
  })

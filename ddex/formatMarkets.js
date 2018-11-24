module.exports = (markets = []) =>
  markets.map(market => {
    const [_quoteToken, _baseToken] = market.id.split("-")
    const baseToken = _baseToken === "ETH" ? "WETH" : _baseToken
    const quoteToken = _quoteToken === "ETH" ? "WETH" : _quoteToken

    return {
      quoteToken,
      baseToken,
      exchange: "DDEX",
      href: `https://ddex.io/trade/${market.id}`
    }
  })

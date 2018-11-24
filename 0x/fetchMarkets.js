const axios = require("axios")

module.exports = async (url = null, formatter = f => f) => {
  if (!url || !formatter) return []
  const { status, data } = await axios.get(`https://${url}/v2/markets`)
  const markets = data.data ? data.data.markets : data

  return status === 200 ? formatter(markets) : []
}

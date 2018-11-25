const formartDDEXMarkets = require("../ddex/formatMarkets")
const formartRadarRelayMarkets = require("../radarRelay/formatMarkets")
module.exports = [
  {
    name: "RadarRelay",
    url: "api.radarrelay.com",
    formatter: formartRadarRelayMarkets
  },
  { name: "DDEX", url: "api.ddex.io", formatter: formartDDEXMarkets }
]

const toCelsium = temperature =>
    Math.round(Number(temperature) - 273.15) + ' ℃'

export default toCelsium;
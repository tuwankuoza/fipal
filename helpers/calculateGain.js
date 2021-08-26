function calculateGain(income, expense, gain, year) {
  let yearlyIncome = (income-expense)*12

  let result = []
  let capital = 0;

  for(let i = 1; i <= year; i++) {
    if (i === 1) {
      capital = Math.round(yearlyIncome*((1+(gain/100))**i))
    } else {
      capital += Math.round(yearlyIncome*((1+(gain/100))**i))
    }
    result.push(capital)
  }
  return result
}

function proyeksiUsia(age, year) {
  let result = []
  for(let i = 0; i < year; i++) {
    result.push(`Usia - ${age+i}`)
  }
  return result
}

module.exports = {calculateGain, proyeksiUsia}
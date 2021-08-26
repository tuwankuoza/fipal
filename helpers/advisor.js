function investmentAdvisor(income, expense, age) {

  let saving = ((income - expense)/expense)*100
  let output = []

  if(age >= 45) {
    saving >= 35 ? output.push('deposito') : output;
    saving >= 20 ? output.push('emas') : output;
    saving >= 15 ? output.push('obligasi') : output;
  }
  else if (age >= 35 && age < 45) {
    saving >= 50 ? output.push('properti') : output;
    saving >= 15 ? output.push('saham') : output;
    saving >= 5 ? output.push('reksadana') : output;
  }
  else if (age >= 18 && age < 35) {
    saving >= 50 ? output.push('properti') : output;
    saving >= 35 ? output.push('deposito') : output;
    saving >= 20 ? output.push('emas') : output;
    saving >= 15 ? output.push('saham') : output;
    saving >= 5 ? output.push('reksadana') : output;
    saving >= 15 ? output.push('obligasi') : output;
  }

  return output
}
// nge-return array of object nama investment

module.exports = { investmentAdvisor }
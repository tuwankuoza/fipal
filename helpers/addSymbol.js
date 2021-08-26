function addTahun(str) {
  return `${str} tahun`
}

function addPercent(number) {
  return `${number} %`
}

function idrFormatter(number) {
  return `Rp. ${number.toLocaleString('id-ID')}`
}

module.exports = {addTahun, addPercent, idrFormatter}
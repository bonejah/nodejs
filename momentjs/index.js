const moment = require('moment');

const agora = moment();
// const agora = moment(new Date());
// const agora = new Date();
// const agora = moment([]);
// const agora = moment({});

console.log(agora)

const dataNascimento = moment("1981-11-17 17:45");
console.log(dataNascimento)

const dataFormatada = moment('03/12/2018', 'DD/MM/YYYY');
console.log(dataFormatada)

// const dataNascimentoPrecisa = moment("25/05/1994 13:00", "DD/MM/YYYY hh:mm");
// console.log(dataNascimentoPrecisa)

const dataNascimentoInvalida = moment("25/05/1994 13:00", "DD/MM/YYYY", true);
console.log(dataNascimentoInvalida.isValid());

const dataNascimentoValida = moment("25/05/1994", "DD/MM/YYYY", true);
console.log(dataNascimentoValida.isValid());

const data = moment("25/05/1994", "DD/MM/YYYY", "pt", true);
console.log(data)

const agoraAtual = moment();
console.log(agoraAtual)
const dataClonada = agoraAtual.clone();
console.log(dataClonada)

console.log(agoraAtual.date()); // Imprimindo o dia
console.log(agoraAtual.month()); // Imprimindo o mês
console.log(agoraAtual.year()); // Imprimindo o ano
console.log(agoraAtual.hour()); // Imprimindo a hora
console.log(agoraAtual.minute()); // Imprimindo os minutos
console.log(agoraAtual.second()); // Imprimindo os segundos

console.log(agoraAtual.get("date")); // Imprimindo o dia
console.log(agoraAtual.get("month")); // Imprimindo o mês
console.log(agoraAtual.get("year")); // Imprimindo o ano
console.log(agoraAtual.get("hour")); // Imprimindo a hora
console.log(agoraAtual.get("minute")); // Imprimindo os minutos
console.log(agoraAtual.get("second")); // Imprimindo os segundos

const novaData = moment();
console.log(novaData)
novaData.date(25); // Setando o dia
novaData.month(4); // Setando o mês
novaData.year(1994); // Setando o ano
novaData.hour(13); // Setando a hora
novaData.minute(00); // Setando os minutos
novaData.second(00); // Setando os segundos
console.log(novaData)

const novaData2 = moment();
console.log(novaData2)
novaData2.set("date", 25); // Setando o dia
novaData2.set("month", 4); // Setando o mês
novaData2.set("year", 1994); // Setando o ano
novaData2.set("hour", 13); // Setando a hora
novaData2.set("minute", 00); // Setando os minutos
novaData2.set("second", 00); // Setando os segundos
console.log(novaData2)

const dataComValores = moment();
console.log(dataComValores)
dataComValores.add(2, "year"); // também pode ser no plural, ou seja, years
console.log(dataComValores)
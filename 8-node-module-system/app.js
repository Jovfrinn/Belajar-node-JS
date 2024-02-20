const validator = require('validator');
const chalk = require('chalk');


// console.log(validator.isEmail('Jovfrin@gmail.com'));
// console.log(validator.isMobilePhone('081234567', 'id-ID'));
// console.log(validator.isNumeric('jov'));


console.log(chalk.red.bgCyan.italic('Hello World coyy'));
const pesan = chalk`Lorem ipsum dolor {bgRed sit amet} consectetur {bgCyan.strikethrough adipisicing elit}. Provident, veniam?`;
console.log(pesan);

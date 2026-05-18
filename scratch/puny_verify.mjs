import punycode from 'punycode';

const name1 = 'спецзабор';
const name2 = 'спец-забор';

console.log(`Слово: ${name1}  => Punycode: xn--${punycode.encode(name1)}`);
console.log(`Слово: ${name2} => Punycode: xn--${punycode.encode(name2)}`);

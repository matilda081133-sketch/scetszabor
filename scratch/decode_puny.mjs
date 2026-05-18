import punycode from 'punycode';

const domain = 'xn-----8sbdnl8bbob6c.xn--p1ai';
try {
  // toUnicode handles the whole domain
  const decoded = punycode.toUnicode(domain);
  console.log(`Декодированный адрес: ${decoded}`);
} catch (e) {
  console.log('Ошибка декодирования');
}

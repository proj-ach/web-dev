const resultEl = document.getElementById('result'),
      lengthEl = document.getElementById('length'),
      uppercaseEl = document.getElementById('uppercase'),
      lowercaseEl = document.getElementById('lowercase'),
      numbersEl = document.getElementById('numbers'),
      symbolsEl = document.getElementById('symbols'),
      generateEl = document.getElementById('generate'),
      clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: () => String.fromCharCode(Math.random() * 26 + 97),
  upper: () => String.fromCharCode(Math.random() * 26 + 65),
  number: () => String.fromCharCode(Math.random() * 10 + 48),
  symbol: () => "!@#$%^&*(){}[]=<>/,."[Math.floor(Math.random() * 17)]
};

clipboardEl.addEventListener('click', () => {
  if (!resultEl.innerText) return;
  navigator.clipboard.writeText(resultEl.innerText);
  showPopup("Copied!");
});

generateEl.addEventListener('click', () => {
  resultEl.innerText = generatePassword(
    lowercaseEl.checked, uppercaseEl.checked, 
    numbersEl.checked, symbolsEl.checked, 
    +lengthEl.value
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let password = "";
  const types = [{lower}, {upper}, {number}, {symbol}].filter(t => Object.values(t)[0]);
  if (!types.length) return "";

  for (let i = 0; i < length; i += types.length) {
    types.forEach(t => password += randomFunc[Object.keys(t)[0]]());
  }

  return password.slice(0, length);
}

function showPopup(msg) {
	const popup = document.createElement("div");
	popup.innerText = msg;
	popup.style.cssText = `
	  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
	  background: #ffcc00; color: #333; padding: 10px 20px;
	  border-radius: 6px; font-size: 16px; font-weight: bold;
	  transition: opacity 0.3s ease-in-out;
	`;
	document.body.appendChild(popup);
	setTimeout(() => popup.style.opacity = "0", 1200);
	setTimeout(() => popup.remove(), 1500);
  }
  

const input = document.querySelector("#input-screen");
const output = document.querySelector("#output-screen");

input.value = "";
output.value = "=";

const zero = document.querySelector(".zero");
zero.addEventListener("click", () => {
  input.value += "0";
});

const one = document.querySelector(".one");
one.addEventListener("click", () => {
  input.value += "1";
});

const two = document.querySelector(".two");
two.addEventListener("click", () => {
  input.value += "2";
});

const three = document.querySelector(".three");
three.addEventListener("click", () => {
  input.value += "3";
});

const four = document.querySelector(".four");
four.addEventListener("click", () => {
  input.value += "4";
});

const five = document.querySelector(".five");
five.addEventListener("click", () => {
  input.value += "5";
});

const six = document.querySelector(".six");
six.addEventListener("click", () => {
  input.value += "6";
});

const seven = document.querySelector(".seven");
seven.addEventListener("click", () => {
  input.value += "7";
});

const eight = document.querySelector(".eight");
eight.addEventListener("click", () => {
  input.value += "8";
});

const nine = document.querySelector(".nine");
nine.addEventListener("click", () => {
  input.value += "9";
});

const dot = document.querySelector(".dot");
dot.addEventListener("click", () => {
  input.value += ".";
});

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  calculate();
});

const plus = document.querySelector(".plus");
plus.addEventListener("click", () => {
  input.value += "+";
});

const minus = document.querySelector(".minus");
minus.addEventListener("click", () => {
  input.value += "-";
});

const multiply = document.querySelector(".multiply");
multiply.addEventListener("click", () => {
  input.value += "*";
});

const divide = document.querySelector(".divide");
divide.addEventListener("click", () => {
  input.value += "/";
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  if (input.value === "") {
    clearAll();
  } else {
    clearInput();
  }
});

const cross = document.querySelector(".cross");
cross.addEventListener("click", () => {
  removeLastChar();
});

function removeLastChar() {
  input.value = input.value.slice(0, -1);
}

function calculate() {
  try {
    output.value = eval(input.value);
  } catch (error) {
    output.value = "Error";
  }
}

function clearAll() {
  input.value = "";
  output.value = "";
}

function clearInput() {
  input.value = "";
}

clear.addEventListener("dblclick", clearAll);
document.addEventListener("keyup", enter);
function enter(event) {
  if (event.key === "Enter") {
    calculate();
  }
}

document.addEventListener("keydown", backspace);

function backspace(event) {
  if (event.key === "Backspace" && event.shiftKey) {
    clearAll();
  }
}
// visible keys written with chat gpt

const display = document.getElementById("keyDisplay");
let timeoutId;

document.addEventListener("keydown", (e) => {
  const keys = [];

  if (e.ctrlKey) keys.push("Ctrl");
  if (e.shiftKey) keys.push("Shift");
  if (e.altKey) keys.push("Alt");
  if (e.metaKey) keys.push("Meta"); // For Mac ⌘ key

  const keyName = e.key === " " ? "Space" : e.key;

  if (!["Control", "Shift", "Alt", "Meta"].includes(keyName)) {
    keys.push(keyName);
  }

  display.textContent = keys.join(" + ");
  display.style.opacity = 1;

  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    display.style.opacity = 0;
  }, 500);
});

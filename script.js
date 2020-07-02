//Targert DOM Elements
const output = document.getElementById("output-value")
const $operator = document.getElementsByClassName("operator")
const getHistory = () => document.getElementById("history-value").innerText;

const getOutput = () => output.innerText;

const reverseNumberFormat = (num) => Number(num.replace(/,/g, ""));

function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}

const printOutput = (num) => {
  if (num == "") document.getElementById("output-value").innerText = num;
  else
    document.getElementById("output-value").innerText = getFormattedNumber(num);
};

const getFormattedNumber = (num) => {
  if (num == "-") return "";
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
};

const operator = $operator;

for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id == "=") {
          var result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}

var number = document.getElementsByClassName("number");

for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}


var microphone = document.getElementById("microphone");
microphone.onclick = function () {
  microphone.classList.add("record");
  var recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();
  operations = {
    plus: "+",
    minus: "-",
    multiply: "*",
    multiplied: "*",
    divide: "/",
    divided: "/",
    reminder: "%",
  };

  recognition.onresult = function (event) {
    var input = event.results[0][0].transcript;
    for (property in operations) {
      input = input.replace(property, operations[property]);
    }
    output.innerText = input;
    setTimeout(function () {
      evaluate(input);
    }, 2000);
    microphone.classList.remove("record");
  };
};
function evaluate(input) {
  try {
    var result = eval(input);
    output.innerText = result;
  } catch (e) {
    console.log(e);
    output = "";
  }
}


for (var item of document.querySelectorAll(".style")) {
    item.addEventListener("mousedown", function (evt) {
        evt.target.classList.add("styleOnClick");
    }, false);
}


document.getElementById('clear').addEventListener("mousedown", function () {
    document.querySelector(".style").classList.add("styleOnClick");
    document.getElementsByTagName('svg')[0].setAttribute("width", "13px");
    document.getElementsByTagName('svg')[0].setAttribute("height", "13px");
});

document.addEventListener("mouseup", function (){

 for (var item of document.querySelectorAll(".style")) {
     item.classList.remove("styleOnClick");
}
    document.getElementsByTagName('svg')[0].classList.remove('styleOnClick');
    document.querySelector(".style").classList.remove("styleOnClick");
    document.getElementsByTagName('svg')[0].setAttribute("width", "15px");
    document.getElementsByTagName('svg')[0].setAttribute("height", "15px");
});


















function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}
var microphone = document.getElementById('microphone');
microphone.onclick=function(){
	microphone.classList.add("record");
	var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	recognition.lang = 'en-US';
	recognition.start();
	operations = {"plus":"+",
				 "minus":"-",
				 "multiply":"*",
				 "multiplied":"*",
				 "divide":"/",
				 "divided":"/",
				 "reminder":"%"}
	
	recognition.onresult = function(event){
		var input = event.results[0][0].transcript;
		for(property in operations){
			input= input.replace(property, operations[property]);
		}
		document.getElementById("output-value").innerText = input;
		setTimeout(function(){
			evaluate(input);
		},2000);
		microphone.classList.remove("record");
	}
	
}
function evaluate(input){
	try{
		var result = eval(input);
		document.getElementById("output-value").innerText = result;
	}
	catch(e){
		console.log(e);
		document.getElementById("output-value").innerText = "";
	}
}
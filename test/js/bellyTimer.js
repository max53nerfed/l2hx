var countDownDate = new Date("December 6, 2024 20:00:00").getTime();
var x = setInterval(function() {
var now = new Date();
var localOffset = now.getTimezoneOffset() * 60000;
var utc = now.getTime() + localOffset;
var offset = 2;   
var bombay = utc + (3600000*offset);
var nd = new Date(bombay); 
var distance = countDownDate - nd;

var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("demo").innerHTML = days + " days, " + hours + " Hr, "
  + minutes + " Min, " + seconds + " Sec ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = " ";
  }
}, 1000);
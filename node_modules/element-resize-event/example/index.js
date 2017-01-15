elementResizeEvent = require('../index.js');

element = document.getElementById("resize");
window.p = p = document.getElementById("width");
console.log(p);
console.log(elementResizeEvent);
console.log(elementResizeEvent(element, function() {
  console.log("resized!");
  console.log(element.offsetWidth);
  console.log(p);
  console.log(element.offsetWidth + "px wide");
  p.innerHTML = element.offsetWidth + "px wide";
}));

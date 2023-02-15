function skyCTRL() {
  var sky = document.getElementById("sky");
  if (sky.getAttribute("opacity")=="0") {
    sky.setAttribute("opacity","0.95");
   } else {
    sky.setAttribute("opacity","0");
  }
}
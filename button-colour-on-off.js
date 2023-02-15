var header = document.getElementById("bottomButtons");
var buttons = header.getElementsByClassName("button");
for (let i = 0, l = buttons.length; i < l; i++) {
  buttons[i].addEventListener('click', function() {
    buttons[i].classList.toggle('active');
  })
}
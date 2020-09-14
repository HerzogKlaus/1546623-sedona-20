let btn = document.querySelector(".menu__btn");
let burgerBtn = document.querySelector(".menu__burger-btn")
let menuElem = document.querySelectorAll(".menu__link");
btn.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu__close")) {
    e.target.classList.add("menu__burger-btn");
    e.target.classList.remove("menu__close");
    menuElem.forEach((elem) => {
      if (!elem.classList.contains("menu__link--logo")) {
        elem.classList.add("close");
      } else {
        return;
      }
    });
  } else if(e.target.classList.contains("menu__burger-btn")) {
    console.log('111');
    e.target.classList.add("menu__close");
    e.target.classList.remove("menu__burger-btn");
    menuElem.forEach((elem) => {
      if (!elem.classList.contains("menu__link--logo")) {
        elem.classList.remove("close");
      } else {
        return;
      }
    });
  }
});

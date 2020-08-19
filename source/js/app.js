document.querySelector(".menu__close").onclick = () => {
  let menuElem = document.querySelectorAll(".menu__link");
  menuElem.forEach((elem) => {
    if (!elem.classList.contains("menu__link--logo")) {
      elem.classList.add("close");
    } else {
      return;
    }
  });
  document.querySelector('.')
};

document.querySelector(".menu__close").onclick = (e) => {
  let menuElem = document.querySelectorAll(".menu__link");
  menuElem.forEach((elem) => {
    if (!elem.classList.contains("menu__link--logo")) {
      elem.classList.add("close");
    } else {
      return;
    }
  });
  document.querySelector('.header__burger-menu').style.display = 'flex';
  e.toElement.style.display = 'none';
};

document.querySelector('.header__burger-menu').onclick = (e) => {
  let menuElem = document.querySelectorAll(".menu__link");
  menuElem.forEach((elem) => {
    if (!elem.classList.contains("menu__link--logo")) {
      elem.classList.remove("close");
    } else {
      return;
    }
  });
  document.querySelector('.menu__close').style.display = 'block';
  e.toElement.style.display = 'none';
}


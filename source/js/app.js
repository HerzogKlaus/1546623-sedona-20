let btn = document.querySelector(".menu__close");

btn.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu__close")) {
    e.target.classList.add("menu__burger-btn");
    e.target.classList.remove("menu__close");
  } else {
    e.target.classList.add("menu__close");
    e.target.classList.remove("menu__burger-btn");
  }
});


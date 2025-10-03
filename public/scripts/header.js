const toggleMobileMenu = () => {
  const body = document.body;
  body.classList.toggle("open");

  const menuIcon = document.querySelector(".mobile-menu img");
  if (menuIcon.getAttribute("src") === "/icons/menu.svg") {
    menuIcon.setAttribute("src", "/icons/close.svg");
  } else {
    menuIcon.setAttribute("src", "/icons/menu.svg");
  }

  const mobileMenu = document.querySelector(".mobile-menu ul");
  mobileMenu.classList.toggle("open");
};

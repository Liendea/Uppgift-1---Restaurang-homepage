"use strict";

const hamburger_button = document.querySelector(".hamburger-nav");
const hamburger_top = document.querySelector(".line-1");
const hamburger_middle = document.querySelector(".line-2");
const hamburger_bottom = document.querySelector(".line-3");
const mobile_nav = document.querySelector(".mobile-nav");
const body = document.querySelector("body");

hamburger_button.addEventListener("click", () => {
  hamburger_top.classList.toggle("clicked");
  hamburger_middle.classList.toggle("clicked");
  hamburger_bottom.classList.toggle("clicked");

  mobile_nav.classList.toggle("hidden");

  if (!mobile_nav.classList.contains("hidden")) {
    body.style.overflow = "hidden";
  } else {
    body.style.removeProperty("overflow");
  }
});

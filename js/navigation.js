"use strict";

// Hamburger button and mobile menu

const hamburger_button = document.querySelector(".hamburger-nav");
const hamburger_top = document.querySelector(".line-1");
const hamburger_middle = document.querySelector(".line-2");
const hamburger_bottom = document.querySelector(".line-3");
const mobile_nav = document.querySelector(".mobile-nav");
const body = document.querySelector("body");

// Eventlistener when hamburger button is clicked
hamburger_button.addEventListener("click", () => {
  hamburger_top.classList.toggle("clicked");
  hamburger_middle.classList.toggle("clicked");
  hamburger_bottom.classList.toggle("clicked");

  // Toggle mobile menu
  mobile_nav.classList.toggle("hidden");

  // IF mobile menu is open, prevent scrolling on body
  if (!mobile_nav.classList.contains("hidden")) {
    body.style.overflow = "hidden";
  } else {
    // IF not mobile menu is open, allow scrolling on body
    body.style.removeProperty("overflow");
  }
});

///////////////////////////////////////////////////////////

// Close mobile manu if window is resized

window.addEventListener("resize", () => {
  // IF mobile meny is open and window is larget than 1000 px then HIDE mobile meny and hamburger button
  if (!mobile_nav.classList.contains("hidden") && window.innerWidth > 1000) {
    mobile_nav.classList.add("hidden");
    hamburger_button.classList.add("hidden");
    // OR if mobile meny is hidden and window is rezied to less than 1000 px
    // then show hamburger button and reset hamburger button lines
  } else if (
    mobile_nav.classList.contains("hidden") &&
    window.innerWidth < 1000
  ) {
    hamburger_button.classList.remove("hidden");
    hamburger_top.classList.remove("clicked");
    hamburger_middle.classList.remove("clicked");
    hamburger_bottom.classList.remove("clicked");
  }
});

///////////////////////////////////////////////////////////

// Close mobile menu when mobile nav links are clicked

const mobile_nav_links = document.querySelectorAll(".mobile-nav-links");

mobile_nav_links.forEach((link) => {
  link.addEventListener("click", () => {
    body.style.removeProperty("overflow");

    mobile_nav.classList.add("hidden");
    hamburger_top.classList.toggle("clicked");
    hamburger_middle.classList.toggle("clicked");
    hamburger_bottom.classList.toggle("clicked");
  });
});

///////////////////////////////////////////////////////////

// Make <nav> fixed and visible on scroll up

// Select the navigation container element
const nav = document.querySelector(".nav-container");
// Store the last scroll position
let lastScroll = 0;

// Listen for the scroll event on the window
window.addEventListener("scroll", () => {
  // Get the current vertical scroll position
  const currentScroll = window.pageYOffset;

  // IF current scroll is 0 (top of the page) remove classList "scroll-up"
  if (currentScroll <= 0) {
    nav.classList.remove("scroll-up");
  }
  // IF scrolling DOWN and the nav doesn't already have "scroll-down"
  // Hide the nav by adding "scroll-down" and removing "scroll-up"
  if (currentScroll > lastScroll && !nav.classList.contains("scroll-down")) {
    nav.classList.remove("scroll-up");
    nav.classList.add("scroll-down");
  }
  // IF scrolling UP and the nav currently has "scroll-down"
  // Show the nav by adding "scroll-up" and removing "scroll-down"
  if (currentScroll < lastScroll && nav.classList.contains("scroll-down")) {
    nav.classList.remove("scroll-down");
    nav.classList.add("scroll-up");
  }

  // Update the last scroll position for the next scroll event
  lastScroll = currentScroll;
});

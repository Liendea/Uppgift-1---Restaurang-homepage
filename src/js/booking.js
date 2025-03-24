"use strict";

// Containers
const dinner_weekday = document.querySelector(".dinner-weekdays");
const dinner_saturday = document.querySelector(".dinner-saturday");
const lunch = document.querySelector(".lunch-container");

// Input fields
const dateInput = document.getElementById("date-input");
const select_dinner_saturdays = document.getElementById("dinner-saturday");
const select_dinner_weekdays = document.getElementById("dinner-weekdays");
const select_lunch = document.getElementById("lunch-time");

// -----------------------------------------------------------
// 1. Disable dates that has already passed
// 2. When user choses Mon -Fri. Show available time slots for lunch and dinner.
// 3. When user choses Saturday.Show available time slots for dinner.
// 4. Check time when user chooses date. Only show available times based on current time.
// 5. Redirect user to confirmation page when form is submitted
// -----------------------------------------------------------

// 1. Disable dates that has allready passed
dateInput.addEventListener("click", () => {
  const currentDate = getCurrentDate();
  diasblePassedDays(currentDate);

  // 2. Find out wich day is choosen and show right time table depending on day.
  dateInput.addEventListener("change", () => {
    const selectedDate = dateInput.value;
    const dayOfWeek = getWeekDay(selectedDate);

    // Reset time tables
    dinner_weekday.classList.add("hidden");
    lunch.classList.add("hidden");
    dinner_saturday.classList.add("hidden");

    disableTimes(select_lunch, selectedDate);
    disableTimes(select_dinner_weekdays, selectedDate);
    disableTimes(select_dinner_saturdays, selectedDate);

    if (dayOfWeek === 0) {
      console.log("Sundays are closed");
    }
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      console.log("Monday - Friday");

      // Show / hide times depending on what day it is
      dinner_weekday.classList.remove("hidden");
      lunch.classList.remove("hidden");
      dinner_saturday.classList.add("hidden");

      // Inactivate times that has already passed
      disableTimes(select_lunch, selectedDate);
      disableTimes(select_dinner_weekdays, selectedDate);
    }
    if (dayOfWeek === 6) {
      console.log("Saturday");

      // Show / hide times depending on what day it is
      dinner_saturday.classList.remove("hidden");
      dinner_weekday.classList.add("hidden");
      lunch.classList.add("hidden");

      // Inactivate times that has already passed
      disableTimes(select_dinner_saturdays, selectedDate);
    }
  });
});

// 5. Redirect user to confirmation page when form is submitted
const reservationForm = document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevets form to be sent in usual way

    // Redirects to confirmation page
    window.location.href = "confirmation.html";
  });

// -----------------------------------------------------------

// FUNKTIONER

// Function tp get week days
function getWeekDay(choosen_date) {
  const selectedDate = new Date(choosen_date);
  const dayOfWeek = selectedDate.getDay();
  return dayOfWeek;
}

// Function to get current date
function getCurrentDate() {
  const currentDate = new Date();

  // Get current date
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Månader är 0-indexerade (0-11)
  const day = currentDate.getDate().toString().padStart(2, "0"); // Lägg till noll om dagen är ensiffrig

  // Format current date to "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

// Function to disable passed dates
function diasblePassedDays(formattedDate) {
  dateInput.setAttribute("min", formattedDate);
}

// Function to get current time (format HH:mm)
function getCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}

// Function to disable passed time slots
function disableTimes(element, selectedDate) {
  // Options
  const options = Array.from(element.getElementsByTagName("option"));
  const currentTime = getCurrentTime();
  const currentDate = getCurrentDate();

  options.forEach((option) => {
    const optionTime = option.innerText.trim();

    // IF the chosen dates is is the future -> make all options available
    if (selectedDate > currentDate) {
      option.disabled = false;
      option.style.color = "green";
    }
    // IF the chosen date is the current date &&  current time is more than the option -> disable option
    else if (selectedDate === currentDate && currentTime > optionTime) {
      option.disabled = true;
      option.style.removeProperty("color");
    } else {
      option.disabled = false;

      option.style.color = "green";
    }
  });
}

// Function to refresh date input when page is loaded
function refreshDateInput() {
  dateInput.value = "";
}

refreshDateInput();

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
// 1. Disable dates that has allready passed
// 2. När användaren väljer dag Mån - Fredag. Visa tider för lunch och middag på veckodagar
// 3. När användaren väljer lördag. Visa middagstider för lördag
// 4. Kontorllea vad klockan är när användaren gär valet, har tiden passerat? visa endast tillgängliga tider.
// -----------------------------------------------------------

// 1. Disable dates that has allready passed
dateInput.addEventListener("click", () => {
  const currentDate = getCurrentDate();
  diasblePassedDays(currentDate);

  // 2. Ta reda på vilken dag som är valt och visa rätt tidsval beroende på dag
  dateInput.addEventListener("change", () => {
    const selectedDate = dateInput.value;
    const dayOfWeek = getWeekDay(selectedDate);

    // Återställ visning och inaktiverade alternativ
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

      // Visa dölj tider beroende på dag
      dinner_weekday.classList.remove("hidden");
      lunch.classList.remove("hidden");
      dinner_saturday.classList.add("hidden");

      // Inaktivera passerade tider
      disableTimes(select_lunch, selectedDate);
      disableTimes(select_dinner_weekdays, selectedDate);
    }
    if (dayOfWeek === 6) {
      console.log("Saturday");

      // Visa dölj tider beroende på dag
      dinner_saturday.classList.remove("hidden");
      dinner_weekday.classList.add("hidden");
      lunch.classList.add("hidden");

      // Inaktivera passerade tider
      disableTimes(select_dinner_saturdays, selectedDate);
    }
  });
});

// -----------------------------------------------------------

// FUNKTIONER

// Funktion för att hämta veckodagar
function getWeekDay(choosen_date) {
  const selectedDate = new Date(choosen_date);
  const dayOfWeek = selectedDate.getDay();
  return dayOfWeek;
}

// funktion för att hämta current date i format YYYY-MM-DD
function getCurrentDate() {
  const currentDate = new Date();

  // Hämta dagens datum i formatet YYYY-MM-DD
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Månader är 0-indexerade (0-11)
  const day = currentDate.getDate().toString().padStart(2, "0"); // Lägg till noll om dagen är ensiffrig

  // Formatera dagens datum till "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

// Funktion för att diasble passerade dagar
function diasblePassedDays(formattedDate) {
  dateInput.setAttribute("min", formattedDate);
}

// funktion för att kontrollera nuvarande tid i format HH:mm
function getCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}

// Funktion för att disable tider som redan passerat
function disableTimes(element, selectedDate) {
  // Options
  const options = Array.from(element.getElementsByTagName("option"));
  const currentTime = getCurrentTime();
  const currentDate = getCurrentDate();

  options.forEach((option) => {
    const optionTime = option.innerText.trim();

    // Om det valda datumet är i framtiden, gör alla alternativ tillgängliga
    if (selectedDate > currentDate) {
      option.disabled = false;
      option.style.color = "green";
    }
    // Om det valda datumet är dagens datum && klockan är mer än optionet så ska option vara disable
    else if (selectedDate === currentDate && currentTime > optionTime) {
      option.disabled = true;
      option.style.removeProperty("color");
    } else {
      option.disabled = false;

      option.style.color = "green";
    }
  });
}

// funktion för att refresha datum input när sidan laddas

function refreshDateInput() {
  dateInput.value = "";
}

refreshDateInput();

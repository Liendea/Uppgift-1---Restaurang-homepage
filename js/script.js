"use strict";

// Menu section fetch menu from JSON file

// Step 1: Collect all container elements in an object
const containers = {
  starters: document.querySelector(".starters"),
  baos: document.querySelector(".baos"),
  bahn_mi: document.querySelector(".bahn-mi"),
  bowls: document.querySelector(".sig-bowls"),
  desserts: document.querySelector(".desserts"),
  drinks: document.querySelector(".drinks"),
};

// Step 2: Function to create menu items
function createMenuItem(item) {
  const menuItem = document.createElement("div");
  menuItem.classList.add("menu-item");

  menuItem.innerHTML = `
      <div class="dish">
        <h4 class="italic">${item.name}</h4>
        <h4 class="italic">${item.price}</h4>
      </div>
      <hr />
      <p>${item.description}<br />
        ${item.allergens}
      </p>
    `;

  return menuItem;
}

// Step 3: Fetch and loop through meny
fetch(
  "https://raw.githubusercontent.com/Liendea/Uppgift-1---Restaurang-homepage/main/Json/menu.json"
) // fetching from RAW data filepath from github instead of realtive filepath
  // because of github coould not load JSON file when JSON file is placed in a separate folder in the repo
  .then((response) => response.json())
  .then((menu) => {
    // Loop thorugh every menu group
    Object.keys(containers).forEach((category) => {
      const container = containers[category]; // Chose container from container object, For example containers["starter"].
      const items = menu[category]; // for example menu["starters"]

      items.forEach((item) => {
        // For each item (dish) in menu category
        const menuItem = createMenuItem(item); // call createMenuItem function
        container.appendChild(menuItem); // append menuItem to container
      });
    });
  });

/////////////////////////////////////////////////////////////////////

// Menu filter buttons
const filter_buttons = document.querySelectorAll(".filter-button");

filter_buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Växla "active" klass på knappen
    button.classList.toggle("active");

    // OM ingen filterknapp är tryckt så visa hela menyn
    const activeButtons = document.querySelectorAll(".filter-button.active");
    if (activeButtons.length === 0) {
      Object.values(containers).forEach((container) => {
        container.classList.remove("hidden");
      });
    } else {
      // Gå igenom ALLA knappar och uppdatera respektive container
      filter_buttons.forEach((btn) => {
        // Hämta vilken container denna knapp pekar på
        const target = btn.getAttribute("data-target");
        const container = containers[target];

        // Om knappen är aktiv, visa containern
        if (btn.classList.contains("active")) {
          container.classList.remove("hidden");
        } else {
          // Annars dölj containern
          container.classList.add("hidden");
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////

// remove hover effekt på filter knappar

function removeHover() {
  if (window.innerWidth < 450) {
    filter_buttons.forEach((button) => {
      button.classList.remove("filter-hover");
    });
  }
}
removeHover();
/////////////////////////////////////////////////////////////////////

// Lunch buffet read more toggle
const read_more = document.querySelector(".read-more");
const more_info = document.querySelector(".more-info");
const more_less = document.querySelector("#more-less");
const arrow = document.querySelector("#arrow");

read_more.addEventListener("click", () => {
  more_info.classList.toggle("hidden");

  if (!more_info.classList.contains("hidden")) {
    more_less.textContent = "Read Less";
    arrow.style.rotate = "180deg";
  } else {
    more_less.textContent = "Read More";
    arrow.style.rotate = "360deg";
  }
});

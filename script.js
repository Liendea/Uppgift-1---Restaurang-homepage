"use strict";

// Collect menu content from JSON
fetch("menu.json")
  .then(function (response) {
    return response.json();
  })

  .then(function (menu) {
    console.table(menu);
    const starters = menu.starters;
    const baos = menu.baos;
    const bahn_mi = menu.bahn_mi;
    const bowls = menu.bowls;
    const desserts = menu.desserts;
    const drinks = menu.drinks;

    // Starters
    const starter_container = document.querySelector(".starters");

    starters.forEach((starter) => {
      const starter_item = document.createElement("div");
      starter_item.classList.add("menu-item");

      starter_item.innerHTML = `
          <!-- Starter item -->
            <div class="dish">
              <h4 class="italic">${starter.name}</h4>
              <h4 class="italic">${starter.price}</h4>
            </div>
            <hr />
            <p>${starter.description}<br />
              ${starter.allergens}
            </p>
      `;

      starter_container.appendChild(starter_item);
    });

    // Bao Buns
    const bao_container = document.querySelector(".baos");

    baos.forEach((bao) => {
      const bao_item = document.createElement("div");
      bao_item.classList.add("menu-item");
      bao_item.innerHTML = `   
        <!-- Bao item -->
            <div class="dish">
              <h4 class="italic">${bao.name}</h4>
              <h4 class="italic">${bao.price}</h4>
            </div>
            <hr />
            <p>${bao.description}<br />
              ${bao.allergens}
            </p>`;

      bao_container.appendChild(bao_item);
    });

    // Bahn Mi
    const bahnMi_container = document.querySelector(".bahn-mi");

    bahn_mi.forEach((bahnMi) => {
      const bahnMi_item = document.createElement("div");
      bahnMi_item.classList.add("menu-item");
      bahnMi_item.innerHTML = `   
         <!-- Bahn Mi item -->
             <div class="dish">
               <h4 class="italic">${bahnMi.name}</h4>
               <h4 class="italic">${bahnMi.price}</h4>
             </div>
             <hr />
             <p>${bahnMi.description}<br />
               ${bahnMi.allergens}
             </p>`;

      bahnMi_container.appendChild(bahnMi_item);
    });

    // Bowls
    const bowls_container = document.querySelector(".sig-bowls");

    bowls.forEach((bowl) => {
      const bowl_item = document.createElement("div");
      bowl_item.classList.add("menu-item");
      bowl_item.innerHTML = `   
         <!-- Bowl item -->
             <div class="dish">
               <h4 class="italic">${bowl.name}</h4>
               <h4 class="italic">${bowl.price}</h4>
             </div>
             <hr />
             <p>${bowl.description}<br />
               ${bowl.allergens}
             </p>`;

      bowls_container.appendChild(bowl_item);
    });

    // Desserts
    const dessert_container = document.querySelector(".desserts");

    desserts.forEach((dessert) => {
      const dessert_item = document.createElement("div");
      dessert_item.classList.add("menu-item");
      dessert_item.innerHTML = `   
         <!-- Bowl item -->
             <div class="dish">
               <h4 class="italic">${dessert.name}</h4>
               <h4 class="italic">${dessert.price}</h4>
             </div>
             <hr />
             <p>${dessert.description}<br />
               ${dessert.allergens}
             </p>`;

      dessert_container.appendChild(dessert_item);
    });

    // Drinnks & refreshments
    const drink_container = document.querySelector(".drinks");

    drinks.forEach((drink) => {
      const drink_item = document.createElement("div");
      drink_item.classList.add("menu-item");
      drink_item.innerHTML = `   
             <!-- Bowl item -->
                 <div class="dish">
                   <h4 class="italic">${drink.name}</h4>
                   <h4 class="italic">${drink.price}</h4>
                 </div>
                 <hr />
                 <p>${drink.description}<br />
                   ${drink.allergens}
                 </p>`;

      drink_container.appendChild(drink_item);
    });
  });

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

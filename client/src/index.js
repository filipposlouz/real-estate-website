// Selectors
// 1st column
const toOption = document.querySelector("#valuesToOption");
const prefecture = document.querySelector("#valuesPrefect");
const priceFrom = document.querySelector("#priceFrom");
const priceTo = document.querySelector("#priceTo");
// 2nd column
const houseType = document.querySelector("#valuesHouseType");
const townsInPrefect = document.querySelector("#valuesTownsInPrefect");
const sizeFrom = document.querySelector("#sizeFrom");
const sizeTo = document.querySelector("#sizeTo");
// 3rd column
const numOfRooms = document.querySelector("#numOfRooms");
const numOfFloors = document.querySelector("#numOfFloors");
const placesInTown = document.querySelector("#valuesPlacesInTown");
const searchButton = document.querySelector(".search_btn");

// Event Listeners
prefecture.addEventListener("change", async (e) => {
  e.preventDefault();
  const value = prefecture.value;
  const allTowns = await fetch("http://localhost:3000/allTowns", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.error("Error getting json data...", err));
  for (const outerKey in allTowns) {
    if (value === outerKey) {
      townsInPrefect.innerHTML = "";
      const town = allTowns[outerKey];
      for (const key in town) {
        if (town.hasOwnProperty(key)) {
          const option = document.createElement("option");
          option.value = key;
          option.innerText = town[key];
          townsInPrefect.appendChild(option);
        }
      }
      placesInTown.innerHTML = "";
      const dummyOption = document.createElement("option");
      dummyOption.innerText = "Όλες οι περιοχές";
      placesInTown.appendChild(dummyOption);
      placesInTown.setAttribute("disabled", "true");
      break;
    }
  }
});

townsInPrefect.addEventListener("change", async (e) => {
  e.preventDefault();
  const prefectureValue = prefecture.value;
  const value = townsInPrefect.value;
  const url = `http://localhost:3000/${prefectureValue}`;
  const allPlaces = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error("Error getting json data...", err);
    });
  if (value === "allStates") {
    placesInTown.innerHTML = "";
    const dummyOption = document.createElement("option");
    dummyOption.innerText = "Όλες οι περιοχές";
    placesInTown.appendChild(dummyOption);
    placesInTown.setAttribute("disabled", "true");
  } else {
    for (const outerKey in allPlaces) {
      if (value === outerKey) {
        placesInTown.removeAttribute("disabled");
        placesInTown.innerHTML = "";
        const place = allPlaces[outerKey];
        for (const key in place) {
          if (place.hasOwnProperty(key)) {
            const option = document.createElement("option");
            option.value = key;
            option.innerText = place[key];
            placesInTown.appendChild(option);
          }
        }
        break;
      }
    }
  }
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
});

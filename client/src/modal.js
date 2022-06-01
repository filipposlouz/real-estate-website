// Selectors

const nameOfOwner = document.querySelector(".nameOfOwner");
const phoneOfOwner = document.querySelector(".phoneOfOwner");
const address = document.querySelector(".address");

const toOption = document.querySelector("#valuesToOption");
const prefecture = document.querySelector("#valuesPrefect");
const price = document.querySelector("#price");
const size = document.querySelector("#size");

const houseType = document.querySelector("#valuesHouseType");
const townsInPrefect = document.querySelector("#valuesTownsInPrefect");

const numOfRooms = document.querySelector("#numOfRooms");
const numOfFloors = document.querySelector("#numOfFloors");
const placesInTown = document.querySelector("#valuesPlacesInTown");
const description = document.querySelector("#description");
const photo = document.querySelector("#photo");
const ownership_file = document.querySelector("#ownership_file");

const add_btn = document.querySelector(".create_house_btn button");

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

add_btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let toSell = true;
  if (toOption.value === "buy") {
    toSell = true;
  } else {
    toSell = false;
  }
  const property = {
    nameOfOwner: nameOfOwner.value,
    phoneOfOwner: phoneOfOwner.value,
    province: prefecture.value,
    town: townsInPrefect.value,
    placeInTown: placesInTown.value,
    address: address.value,
    toSell: toSell,
    squareMeters: size.value,
    description: description.value,
    price: price.value,
    typeOfProperty: houseType.value,
    numOfRooms: numOfRooms.value,
    numOfFloors: numOfFloors.value,
  };

  const res = await fetch("http://localhost:3000/createListings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ hash: localStorage.getItem("id"), ...property }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  console.log(res.id);
  const formDataImage = new FormData();
  formDataImage.append("fileToUpload", photo.files[0]);
  console.log("first");
  const sendImage = await fetch(
    `http://localhost:3000/property/${res.id}/image`,
    {
      method: "POST",
      body: formDataImage,
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const formDataPdf = new FormData();
  formDataPdf.append("fileToUpload", ownership_file.files[0]);
  console.log("here");
  const sendPdf = await fetch(`http://localhost:3000/property/${res.id}/pdf`, {
    method: "POST",
    body: formDataPdf,
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
});

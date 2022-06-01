// Selectors
const listings = document.querySelector(".grid_listings article .data");
const searchButton = document.querySelector(".search_btn");
const toOption = document.querySelector("#valuesToOption");
const prefecture = document.querySelector("#valuesPrefect");
const priceFrom = document.querySelector("#priceFrom");
const priceTo = document.querySelector("#priceTo");
const houseType = document.querySelector("#valuesHouseType");
const townsInPrefect = document.querySelector("#valuesTownsInPrefect");
const sizeFrom = document.querySelector("#sizeFrom");
const sizeTo = document.querySelector("#sizeTo");
const numOfRooms = document.querySelector("#numOfRooms");
const numOfFloors = document.querySelector("#numOfFloors");
const sort = document.querySelector("#taksinomisiValues");

var propertyElem = new Array();
var response = new Array();

const titleTranslation = {
  oneFloor: "Μονοκατοικία",
  flat: "Διαμέρισμα",
  villa: "Βίλα",
  mezoneta: "Μεζονέτα",
  studio: "Studio",
  field: "Αγροτέμαχιο",
  place: "Οικόπεδο",
};
const asArray = Object.entries(titleTranslation);

// Event Listeners
window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
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
    const locData = await fetch(`http://localhost:3000/${outerKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .catch((err) => console.error("Error getting json data...", err));
    for (const loc in locData) {
      if (loc === "allStates") continue;
      for (const innerKey in locData[loc]) {
        if (locData[loc][innerKey] === "Όλες οι περιοχές") continue;
        const option = document.createElement("option");
        option.value = innerKey + "&" + loc;
        option.innerText =
          locData[loc][innerKey] + ` ( ${allTowns[outerKey][loc]} )`;
        prefecture.appendChild(option);
      }
    }
  }
  const role = await fetch("http://localhost:3000/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ hash: localStorage.getItem("id") }),
  }).then((res) => res.json());
  if (
    window.location.href.search(/\?/) === -1 ||
    new URLSearchParams(window.location.search).get("order")
  ) {
    response = await fetch("http://localhost:3000/properties", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    if (
      new URLSearchParams(window.location.search).get("order") === "descending"
    ) {
      response.sort(reverseCompare);
      sort.value = "descending";
    } else if (
      new URLSearchParams(window.location.search).get("order") === "ascending"
    ) {
      response.sort(compare);
      sort.value = "ascending";
    }
  } else {
    const params = new URLSearchParams(window.location.search);
    const requestBody = {
      province: params.get("province"),
      town: params.get("town"),
      placeInTown: params.get("placeInTown"),
      toSell: params.get("toSell"),
      priceFrom: params.get("priceFrom"),
      priceTo: params.get("priceTo"),
      sizeFrom: params.get("sizeFrom"),
      sizeTo: params.get("sizeTo"),
      typeOfProperty: params.get("typeOfProperty"),
      numOfRooms: params.get("numOfRooms"),
      numOfFloors: params.get("numOfFloors"),
    };
    response = await fetch("http://localhost:3000/propertiesFiltered", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((res) => res.json());
  }
  if (response.length === 0) {
    const text = document.createElement("h3");
    text.innerText =
      "Δεν υπάρχουν ακίνητα με τα συγκεκριμένα χαρακτηριστικά...";
    listings.appendChild(text);
  } else {
    // response.sort(reverseCompare);
    let counter = 0;
    response.forEach(async (house) => {
      const outsideColumn = document.createElement("div");
      outsideColumn.setAttribute("class", "outsideColumn");
      const column = document.createElement("div");
      column.setAttribute("class", "column");
      const outsideContainer = document.createElement("div");
      outsideContainer.setAttribute("class", "outsideContainer");
      const middleContainer = document.createElement("div");
      middleContainer.setAttribute("class", "propertyItem");
      const insideContainer = document.createElement("div");
      insideContainer.setAttribute("class", "propertyContent");
      const url = `http://localhost:3000/properties/image/${house.Id}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "image/png",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const imageContainer = document.createElement("div");
      imageContainer.setAttribute("class", "imageContainer");
      const propertyType = document.createElement("a");
      propertyType.setAttribute("class", "propertyType");
      propertyType.setAttribute("href", `property.html?propertyId=${house.Id}`);
      const font = document.createElement("font");
      font.setAttribute("color", "#ffffff");
      font.innerText = house.toSell ? "Προς Πώληση" : "Προς Ενοικίαση";
      propertyType.appendChild(font);
      // Property Image
      const propertyImgLink = document.createElement("a");
      propertyImgLink.setAttribute(
        "href",
        `property.html?propertyId=${house.Id}`
      );
      propertyImgLink.setAttribute("class", "propertyImgLink");
      const propertyImg = document.createElement("img");
      propertyImg.setAttribute("class", "propertyImg");
      propertyImg.setAttribute("src", data.url);
      propertyImgLink.appendChild(propertyImg);
      // Finalising left side
      imageContainer.appendChild(propertyType);
      imageContainer.appendChild(propertyImgLink);

      // Creating right side => text
      const textContainer = document.createElement("div");
      textContainer.setAttribute("class", "textContainer");
      const price = document.createElement("p");
      price.setAttribute("class", "price");
      price.innerText = `${house.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
      textContainer.appendChild(price);
      const title = document.createElement("h4");
      const titleLink = document.createElement("a");
      titleLink.setAttribute("href", `property.html?propertyId=${house.Id}`);
      const titleTranslationVar = asArray.filter(
        ([key, value]) => key === house.typeOfProperty
      );
      titleLink.innerText = `${titleTranslationVar[0][1]}, ${house.squareMeters} τ.μ.`;
      title.appendChild(titleLink);
      textContainer.appendChild(title);
      const code = document.createElement("p");
      code.innerText = `Κωδικός: ${house.Id}`;
      textContainer.appendChild(code);
      textContainer.appendChild(document.createElement("br"));
      const location = document.createElement("p");
      const locationData = await fetch(
        `http://localhost:3000/${house.province}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((response) => response.json())
        .catch((err) => console.error("Error getting json data...", err));
      const townData = await fetch("http://localhost:3000/allTowns", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .catch((err) => console.error("Error getting json data...", err));
      location.innerText = `${locationData[house.town][house.placeInTown]} (${
        townData[house.province][house.town]
      })`;
      const desc = document.createElement("p");
      if (house.description.length > 50)
        desc.innerText = house.description.substring(0, 50) + "...";
      else desc.innerText = house.description;
      textContainer.appendChild(location);
      textContainer.appendChild(desc);
      if (role.role === "Admin") {
        const delButton = document.createElement("button");
        delButton.innerText = "Delete";
        delButton.setAttribute("class", "deleteProperty");
        delButton.addEventListener("click", async (e) => {
          e.preventDefault();
          await fetch(`http://localhost:3000/property/${house.Id}`, {
            method: "DELETE",
          });
          window.location.reload();
        });
        textContainer.appendChild(delButton);
      }
      insideContainer.appendChild(imageContainer);
      insideContainer.appendChild(textContainer);

      middleContainer.appendChild(insideContainer);

      outsideContainer.appendChild(middleContainer);

      column.appendChild(outsideContainer);
      outsideColumn.appendChild(column);
      // listings.appendChild(outsideColumn);
      propertyElem.push(outsideColumn);
      if (counter === response.length - 1) {
        changePage(1);
      }
      counter++;
    });
  }
});

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let toSell = true;
  if (toOption.value === "buy") {
    toSell = true;
  } else {
    toSell = false;
  }
  const property = {
    town: prefecture.value.split("&")[1],
    placeInTown: prefecture.value.split("&")[0],
    toSell: toSell,
    priceFrom: priceFrom.value,
    priceTo: priceTo.value,
    sizeFrom: sizeFrom.value,
    sizeTo: sizeTo.value,
    typeOfProperty: houseType.value,
    numOfRooms: numOfRooms.value,
    numOfFloors: numOfFloors.value,
  };
  window.location.href =
    "listings.html" +
    `?town=${property.town}&placeInTown=${property.placeInTown}&toSell=${property.toSell}&priceFrom=${property.priceFrom}&priceTo=${property.priceTo}&sizeFrom=${property.sizeFrom}&sizeTo=${property.sizeTo}&typeOfProperty=${property.typeOfProperty}&numOfRooms=${property.numOfRooms}&numOfFloors=${property.numOfFloors}`;
});

var current_page = 1;
var records_per_page = 2;

function prevPage() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
}

function nextPage() {
  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
  }
}

function changePage(page) {
  var btn_next = document.getElementById("btn_next");
  var btn_prev = document.getElementById("btn_prev");
  var listing_table = listings;
  var page_span = document.getElementById("page");

  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  listing_table.innerHTML = "";

  for (
    var i = (page - 1) * records_per_page;
    i < page * records_per_page && i < propertyElem.length;
    i++
  ) {
    listing_table.appendChild(propertyElem[i]);
  }
  // page_span.innerHTML = page;

  if (page == 1) {
    btn_prev.disabled = true;
    btn_prev.style.color = "grey";
  } else {
    btn_prev.style.visibility = "visible";
    btn_prev.style.color = "#0088a9";
    btn_prev.disabled = false;
  }

  if (page == numPages()) {
    btn_next.disabled = true;
    btn_next.style.color = "grey";
  } else {
    btn_next.style.visibility = "visible";
    btn_next.style.color = "#0088a9";
    btn_next.disabled = false;
  }
}

function numPages() {
  return Math.ceil(response.length / records_per_page);
}

function compare(a, b) {
  if (a.price < b.price) {
    return -1;
  }
  if (a.price > b.price) {
    return 1;
  }
  return 0;
}

function reverseCompare(a, b) {
  if (a.price > b.price) {
    return -1;
  }
  if (a.price < b.price) {
    return 1;
  }
  return 0;
}

sort.addEventListener("change", async (e) => {
  e.preventDefault();
  if (sort.value === "descending") {
    window.location.href = "listings.html?order=descending";
  } else {
    window.location.href = "listings.html?order=ascending";
  }
});

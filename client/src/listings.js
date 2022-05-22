// Selectors
const listings = document.querySelector(".grid_listings article");

// Event Listeners
window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:3000/properties", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  const outsideColumn = document.createElement("div");
  outsideColumn.setAttribute("class", "col-lg-9 col-md-9");
  const column = document.createElement("div");
  column.setAttribute("class", "column");
  for (house of response) {
    const outsideContainer = document.createElement("div");
    outsideContainer.setAttribute("class", "col-lg-12 col-md-12");
    const middleContainer = document.createElement("div");
    middleContainer.setAttribute("class", "propertyItem");
    const insideContainer = document.createElement("div");
    insideContainer.setAttribute("class", "propertyContent");
    const url = `http://localhost:3000/properties/${house.Id}`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "col-lg-5 col-md-4 col-sm-4");
    const propertyType = document.createElement("a");
    propertyType.setAttribute("class", "propertyType");
    // FIX LINK
    propertyType.setAttribute("href", "#");
    const font = document.createElement("font");
    font.setAttribute("color", "#ffffff");
    font.innerText = house.toSell ? "Προς Πώληση" : "Προς Ενοικίαση";
    propertyType.appendChild(font);
    // Property Image
    const propertyImgLink = document.createElement("a");
    propertyImgLink.setAttribute("href", "#");
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
    textContainer.setAttribute("class", "col-lg-7");
    const price = document.createElement("p");
    price.setAttribute("class", "price");
    price.innerText = `${house.price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
    textContainer.appendChild(price);
    const title = document.createElement("h4");
    const titleLink = document.createElement("a");
    // FIX LINK
    titleLink.setAttribute("href", "#");
    titleLink.innerText = `${house.typeOfProperty}, ${house.squareMeters} τ.μ.`;
    title.appendChild(titleLink);
    textContainer.appendChild(title);
    textContainer.appendChild(document.createElement("br"));
    const code = document.createElement("p");
    code.innerText = `Κωδικός: ${house.Id}`;
    textContainer.appendChild(code);
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
    desc.innerText = house.description;
    textContainer.appendChild(location);
    textContainer.appendChild(desc);

    insideContainer.appendChild(imageContainer);
    insideContainer.appendChild(textContainer);

    middleContainer.appendChild(insideContainer);

    outsideContainer.appendChild(middleContainer);

    column.appendChild(outsideContainer);
  }
  outsideColumn.appendChild(column);
  listings.appendChild(outsideColumn);
});

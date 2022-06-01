// Selectors
const pendingDiv = document.querySelector(".pendingRequests");

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

  const pendingRequests = await fetch(
    "http://localhost:3000/property/pending",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ hash: localStorage.getItem("id") }),
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
  if (pendingRequests === undefined) {
    return;
  } else {
    pendingRequests.forEach(async (house) => {
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
      // FIX LINK
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
      // FIX LINK
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
      if (house.description.length > 100)
        desc.innerText = house.description.substring(0, 100) + "...";
      else desc.innerText = house.description;
      textContainer.appendChild(location);
      textContainer.appendChild(desc);

      const pdf = await fetch(
        `http://localhost:3000/properties/pdf/${house.Id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "image/png",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const pdfElem = document.createElement("a");
      pdfElem.href = pdf.url;
      pdfElem.innerText = pdf.url.split(/\//).pop() + ".pdf";
      textContainer.appendChild(pdfElem);
      textContainer.appendChild(document.createElement("br"));

      const delButton = document.createElement("button");
      delButton.innerText = "Διαγραφή";
      delButton.setAttribute("class", "deleteProperty");
      delButton.addEventListener("click", async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:3000/property/${house.Id}`, {
          method: "DELETE",
        });
        console.log("Property was deleted successfully");
        window.location.reload();
      });
      textContainer.appendChild(delButton);

      const acceptButton = document.createElement("button");
      acceptButton.innerText = "Αποδοχή Αιτήματος";
      acceptButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const acceptPending = await fetch(
          `http://localhost:3000/property/acceptPending/${house.Id_request}`,
          {
            method: "PUT",
          }
        ).then((res) => res.json());
        if (acceptPending.success === true) {
          window.location.reload();
        }
      });
      textContainer.appendChild(acceptButton);

      insideContainer.appendChild(imageContainer);
      insideContainer.appendChild(textContainer);

      middleContainer.appendChild(insideContainer);

      outsideContainer.appendChild(middleContainer);

      outsideColumn.appendChild(column);
      column.appendChild(outsideContainer);
      pendingDiv.appendChild(outsideColumn);
    });
  }
});

window.onload = () => {
  //adding event listners
  document.querySelector("#category").addEventListener("change", getData);
  document.querySelector("#sort").addEventListener("change", getData);
  getData();
};

async function getData() {
  try {
    // Fetching data
    const response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    console.log(data);

    // Getting filter and sort selected values
    let category = document.querySelector("#category").value;
    let sort = document.querySelector("#sort").value;

    // Sorting the data via category
    data = await data.filter((el) => el.category == category);
    data = await sort==0?data.sort((a, b) => a.title.localeCompare(b.title)):data.sort((a, b) => b.title.localeCompare(a.title));
    document.querySelector("#cards").textContent="";

    if(data.length<1){
      let er = document.createElement("h3");
      er.innerText = "No Results :("
      document.querySelector("#cards").append(er);
    }
    
    data.forEach((element) => {
      createCard(element.title, element.description, element.price, element.image);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createCard(title, description, price, imageSrc) {
  // Create card elements
  const card = document.createElement("div");
  card.classList.add("card");

  const cardTitle = document.createElement("h2");
  cardTitle.textContent = title;

  const descr = document.createElement("p");
  descr.textContent = description;

  const cardPrice = document.createElement("p");
  cardPrice.textContent = price;
  cardPrice.classList.add("price");

  const cardImage = document.createElement("img");
  cardImage.src = imageSrc;
  cardImage.alt = title;

  // Append elements to card
  card.appendChild(cardTitle);
  card.appendChild(cardImage);
  card.appendChild(cardPrice);
  card.appendChild(document.createElement("br"));
  card.appendChild(descr);

  document.getElementById("cards").append(card);
}

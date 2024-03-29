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

    // Getting filter and sort selected values
    let category = document.querySelector("#category").value;
    let sort = document.querySelector("#sort").value;
    if(category!="all")
    data = await data.filter((el) => el.category == category);
  // Sorting the data via category
    if(sort!="default")
      data = await sort==0?data.sort((a, b) => a.price-b.price):data.sort((a, b) => b.price-a.price);
    document.querySelector("#cards").textContent="";

    if(data.length<1){
      let er = document.createElement("h3");
      er.innerText = "No Results :("
      document.querySelector("#cards").append(er);
    }
    
    data.forEach((element) => {
      createCard(element.title, element.description, element.price, element.rating, element.image);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createCard(title, description, price, rating, imageSrc) {
  // Create card elements
  const card = document.createElement("div");
  card.classList.add("card");

  const cardTitle = document.createElement("h2");
  cardTitle.textContent = title;

  const cardRating = document.createElement("p");
  cardRating.classList.add("rating");
  cardRating.textContent = rating.rate+" / 5";

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
  console.log(rating)
  card.appendChild(cardRating);
  card.appendChild(document.createElement("br"));
  card.appendChild(descr);

  document.getElementById("cards").append(card);
}

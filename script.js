const submitBtnEl = document.getElementById("submitBtn");
const displayBtnEl = document.getElementById("displayBtn");
const itemsContainerEl = document.getElementById("itemsContainer");
const formEl = document.getElementById("form");
const resContentEl = document.getElementById("resContent");

const renderItems = async () => {
  itemsContainerEl.innerHTML = "";
  try {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    const products = data.products;
    console.log(products);
    for (const product of products) {
      createCard(product);
    }
  } catch {
    (err) => {
      console.log(err.message);
    };
  }
};

const createCard = (product) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  const imageEl = document.createElement("img");
  imageEl.className = "card-img-top";
  imageEl.src = product.image;
  imageEl.alt = product.name;
  cardDiv.append(imageEl);
  const cardBodyEl = document.createElement("div");
  cardBodyEl.className = "card-body";
  const h5El = document.createElement("h5");
  h5El.className = "card-title";
  h5El.innerHTML = product.name;
  cardBodyEl.append(h5El);
  const pEl = document.createElement("p");
  pEl.className = "card-text";
  pEl.innerHTML = `This is the card of ${product.name} and it costs
${product.price} 💵`;
  cardBodyEl.append(pEl);
  cardDiv.append(cardBodyEl);
  const colEl = document.createElement("div");
  colEl.classList = "col-4";
  colEl.append(cardDiv);
  itemsContainerEl.append(colEl);
};

const addItemToProducts = async (_event_) => {
  resContentEl.innerHTML = "";

  try {
    let formData = new FormData(formEl);
    formData = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formData);

    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (res.ok) {
      resContentEl.innerHTML = "Item was successfully added";
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || `Failed to add item: ${res.status}`);
    }
  } catch (error) {
    resContentEl.innerHTML = error.message;
  }
};

displayBtnEl.addEventListener("click", renderItems);
submitBtnEl.addEventListener("click", (e) => {
  addItemToProducts();
});
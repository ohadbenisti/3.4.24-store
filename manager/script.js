const containerEl = document.querySelector(".container")



const renderItems = async () => {
    containerEl.innerHTML = "";
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
    deleteBtn =  document.createElement("button")
    deleteBtn.innerHTML = "Delete Item"
    deleteBtn.id = products_id
    deleteBtn.addEventListener("click", deleteItem())
    cardBodyEl.append(pEl);
    cardDiv.append(cardBodyEl);
    const colEl = document.createElement("div");
    colEl.classList = "col-4";
    colEl.append(cardDiv);
    containerEl.append(colEl);
  };

  renderItems();

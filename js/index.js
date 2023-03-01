const cardArea = document.getElementById("card-area");

let objLength;
let productObj = JSON.parse(localStorage.getItem("productObj"));

if (productObj != null) {
  objLength = Object.keys(productObj).length;
}
//validation and add
if (productObj == null || objLength == 0) {
  cardArea.innerHTML = `<div class="Empty-area">
  <div class="row">
    <div class="col text-center">
    <p class="fw-bold" >There is no Product in Inventory !</p>
      <img src="./Images/empty.png" alt="" class="img-fluid" />
    </div>
  </div>
</div>`;
} else {
  addNewCard(productObj);
}

//selecting form input
const productIdInput = document.getElementById("productId");
const productNameInput = document.getElementById("productName");
const productImgInput = document.getElementById("productImg");
const productPriceInput = document.getElementById("productPrice");
const productDescInput = document.getElementById("productDesc");
// select update button

let curCardId;

function getData(productId) {
  curCardId = productId;
  productIdInput.value = productId;
  productNameInput.value = productObj[productId]["name"];
  productImgInput.value = productObj[productId]["img"];
  productPriceInput.value = productObj[productId]["price"];
  productDescInput.value = productObj[productId]["desc"];
}

function updateData() {
  let newId = productIdInput.value;
  productObj[newId]["name"] = productNameInput.value;
  productObj[newId]["img"] = productImgInput.value;
  productObj[newId]["price"] = productPriceInput.value;
  productObj[newId]["desc"] = productDescInput.value;
  console.log("before update data:", productObj);
  console.log("after update data:", productObj);
  localStorage.setItem("productObj", JSON.stringify(productObj));
  location.reload();
}

function deleteData(id) {
  let ans = prompt(
    `Are you sure to Delete ${id}? Note: type Y for Yes and N for No`
  );
  console.log(ans);

  if (ans == "Y") {
    delete productObj[id];
    localStorage.setItem("productObj", JSON.stringify(productObj));
    location.reload();
  } else {
    return;
  }
}

function addNewCard(productObj) {
  for (let i in productObj) {
    const newCard = `<div class="card m-2" id="${productObj[i]["id"]}">
    <p class="mx-2">#${productObj[i]["id"]}</p>
    <img
      src="${productObj[i]["img"]}"
      class="card-img-top"
      alt=""
      height="200px"
    />
    <div class="card-body">
      <h5 class="card-title fs-4">${productObj[i]["name"]}</h5>
      <hr/>
      <p class="card-text">
      <b>Description:</b>
      ${productObj[i]["desc"]}
      </p>
      <hr/>
      <p class="card-text">
      <b>Price (₹):</b>
      ${productObj[i]["price"]}
    </p>
      <div class="card-btn">
        <button onclick="getData(${i})";
          href="#"
          id="edit-btn"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#editmodal"
          >Edit</button
        >
        <button href="#" id="del-btn" class="btn btn-danger" onclick="deleteData(${i})">Delete</button>
      </div>
    </div>
  </div>`;
    cardArea.insertAdjacentHTML("beforeend", newCard);
  }
}

const filterValue = document.getElementById("filter-info");
const sortValue = document.getElementById("sort-info");

filterValue.addEventListener("change", () => {
  filterData(filterValue.value, sortValue.value);
});
sortValue.addEventListener("change", () => {
  filterData(filterValue.value, sortValue.value);
});

let keys = Object.keys(productObj);

let newObj = [];
console.log(keys);
function filterData(filterValue, sortValue) {
  if (filterValue == "id" && sortValue == "asc") {
    console.log("output");
    newObj = [];
    if (productObj == null || objLength == 0) {
      cardArea.innerHTML = `<div class="Empty-area">
      <div class="row">
        <div class="col text-center">
        <p class="fw-bold" >There is no Product in Inventory !</p>
          <img src="./Images/empty.png" alt="" class="img-fluid" />
        </div>
      </div>
    </div>`;
    } else {
      for (i = 0; i < keys.length; i++) {
        console.log(i, productObj[keys[i]]["id"]);
        newObj.push(productObj[keys[i]]);
        //newObj[productObj[keys[i]]["id"]] = productObj[keys[i]];
      }
      console.log("newObj1", newObj);
      cardArea.innerHTML = "";
      addNewCard(newObj);
    }
  } else if (filterValue == "id" && sortValue == "des") {
    console.log("output 2");
    newObj = [];
    if (productObj == null || objLength == 0) {
      cardArea.innerHTML = `<div class="Empty-area">
      <div class="row">
        <div class="col text-center">
        <p class="fw-bold" >There is no Product in Inventory !</p>
          <img src="./Images/empty.png" alt="" class="img-fluid" />
        </div>
      </div>
    </div>`;
    } else {
      for (i = keys.length - 1; i >= 0; i--) {
        console.log(i, productObj[keys[i]]["id"]);
        newObj.push(productObj[keys[i]]);
        //newObj[productObj[keys[i]]["id"]] = productObj[keys[i]];
      }
      console.log("newObj2", newObj);
      cardArea.innerHTML = "";
      addNewCard(newObj);
    }
  }
}

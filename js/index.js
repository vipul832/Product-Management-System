const cardArea = document.getElementById("card-area");

let objLength;
let productObj = JSON.parse(localStorage.getItem("productObj"));

if (productObj != null) {
  objLength = Object.keys(productObj).length;
}
//validation and add
if (productObj == null || objLength == 0) {
  emptyProduct();
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

let curCardId,
  searchStat = false;

function getData(id) {
  productIdInput.value = productObj[id]["id"];
  productNameInput.value = productObj[id]["name"];
  productImgInput.value = productObj[id]["img"];
  productPriceInput.value = productObj[id]["price"];
  productDescInput.value = productObj[id]["desc"];
  console.log(productObj[id], productObj[id]["name"]);
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

function emptyProduct() {
  cardArea.innerHTML = `<div class="Empty-area">
  <div class="row">
    <div class="col text-center">
    <p class="fw-bold" >There is no Product in Inventory !</p>
      <img src="./Images/empty.png" alt="" class="img-fluid" />
    </div>
  </div>
</div>`;
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
        <button onclick="getData(${productObj[i]["id"]})";
          href="#"
          id="edit-btn"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#editmodal"
          >Edit</button
        >
        <button href="#" id="del-btn" class="btn btn-danger" onclick="deleteData(${productObj[i]["id"]})">Delete</button>
      </div>
    </div>
  </div>`;
    cardArea.insertAdjacentHTML("beforeend", newCard);
  }
}

const filterValue = document.getElementById("filter-info");
const sortValue = document.getElementById("sort-info");
const searchInput = document.getElementById("search-product");

filterValue.addEventListener("change", () => {
  filterData(filterValue.value, sortValue.value, productArray);
  if (searchInput.value) {
    return;
  } else if (searchInput.value == "") {
    console.log("black");
    productArray = [];
    resetProduct();
    filterData(filterValue.value, sortValue.value, productArray);
  }
});
sortValue.addEventListener("change", () => {
  filterData(filterValue.value, sortValue.value, productArray);
  if (searchInput.value) {
    return;
  } else if (searchInput.value == "") {
    console.log("black");
    productArray = [];
    resetProduct();
    filterData(filterValue.value, sortValue.value, productArray);
  }
});

let keys = Object.keys(productObj);

let productArray = [];
resetProduct();

function filterData(filterValue, sortValue, productIn) {
  if (filterValue == "id" && sortValue == "asc") {
    console.log("output");
    if (productObj == null || objLength == 0) {
      emptyProduct();
    } else {
      let curlist = sortData(filterValue, productIn);
      console.log("in asc", curlist);
      cardArea.innerHTML = "";
      addNewCard(curlist);
    }
  } else if (filterValue == "id" && sortValue == "des") {
    console.log("output 2");
    if (productObj == null || objLength == 0) {
      emptyProduct();
    } else {
      let curlist = sortData(filterValue, productIn);
      console.log("in des", curlist);
      cardArea.innerHTML = "";
      addNewCard(curlist.reverse());
    }
  } else if (filterValue == "name" && sortValue == "asc") {
    if (productObj == null || objLength == 0) {
      emptyProduct();
    } else {
      let curlist = sortData(filterValue, productIn);
      cardArea.innerHTML = "";
      addNewCard(curlist);
    }
  } else if (filterValue == "name" && sortValue == "des") {
    if (productObj == null || objLength == 0) {
      emptyProduct();
    } else {
      let curlist = sortData(filterValue, productIn);
      cardArea.innerHTML = "";
      addNewCard(curlist.reverse());
    }
  } else if (filterValue == "price" && sortValue == "asc") {
    if (productObj == null || objLength == 0) {
      emptyProduct();
    } else {
      let curlist = sortData(filterValue, productIn);
      cardArea.innerHTML = "";
      addNewCard(curlist);
    }
  } else if (filterValue == "price" && sortValue == "des") {
    if (productObj == null || objLength == 0) {
      emptyProduct();
    } else {
      let curlist = sortData(filterValue, productIn);
      cardArea.innerHTML = "";
      addNewCard(curlist.reverse());
    }
  }
}

function resetProduct() {
  for (i in productObj) {
    productArray.push(productObj[i]);
  }
}

function sortData(sortBy, productIn = productArray) {
  if (sortBy == "price" || sortBy == "id") {
    let ans = productArray.sort((a, b) => {
      if (parseFloat(a[sortBy]) < parseFloat(b[sortBy])) {
        return -1;
      }
      if (parseFloat(a[sortBy]) > parseFloat(b[sortBy])) {
        return 1;
      }
      return 0;
    });
    return ans;
  } else {
    let ans = productIn.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
    return ans;
  }
}

function searchValue() {
  let toSearch = searchInput.value,
    searchArray = [];
  for (i in productArray) {
    if (productArray[i]["name"].includes(toSearch)) {
      searchArray.push(productArray[i]);
    }
  }
  let l = Object.keys(searchArray).length;

  if (filterValue.value == "") {
  }

  if (l == 0) {
    cardArea.innerHTML = `<div class="Empty-area">
  <div class="row">
    <div class="col text-center">
    <p class="fw-bold" >Product Not Found !</p>
      <img src="./Images/notfound.png" alt="" class="img-fluid" />
    </div>
  </div>
</div>`;
  } else {
    productArray = searchArray;
    filterData(filterValue.value, sortValue.value, productArray);
  }
}

let goSearch = function (fn, d) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, d);
  };
};

let optimizedSearch = goSearch(searchValue, (d = 500));

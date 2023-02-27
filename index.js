//All form input Value
const cardArea = document.getElementById("card-area");
let objLength;
let productObj = JSON.parse(localStorage.getItem("productObj"));

if (productObj != null) {
  objLength = Object.keys(productObj).length;
}

if (productObj == null || objLength == 0) {
  cardArea.innerHTML = `<div class="Empty-area">
  <div class="row">
    <div class="col text-center">
      <img src="./Images/empty.png" alt="" />
      <p class="fw-bold" >There is no Product in Inventory !</p>
    </div>
  </div>
</div>`;
} else {
  console.log(productObj);

  console.log(objLength);
  for (let i in productObj) {
    //let newCard = document.createElement("div");

    const x = `<div class="card m-2" style="width: 18rem">
    <p class="mx-2">#${i}</p>
    <img
      src="${productObj[i]["img"]}"
      class="card-img-top"
      alt=""
      width="200px"
      height="200px"
    />
    <div class="card-body">
      <h5 class="card-title">${productObj[i]["name"]}</h5>
      <p class="card-text">
        ${productObj[i]["desc"]}
      </p>
      <div class="card-btn">
        <a
          href="#"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#editmodal"
          >Edit</a
        >
        <a href="#" class="btn btn-danger">Delete</a>
      </div>
    </div>
  </div>`;
    cardArea.insertAdjacentHTML("beforeend", x);
  }
}

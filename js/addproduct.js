//submit button
const addSubmitBtn = document.querySelector("#addSubmit");

function generateId() {
  productId.value = Math.round(Math.random() * 10000 + 1);
}

//form input selector
const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productImg = document.getElementById("productImg");
const productPrice = document.getElementById("productPrice");
const productDesc = document.getElementById("productDesc");

let productObj = JSON.parse(localStorage.getItem("productObj"));
console.log(productObj);
if (productObj == null) {
  localStorage.setItem("productObj", JSON.stringify({}));
}

addSubmitBtn.addEventListener("click", () => {
  if (
    productId.value == "" ||
    productImg.value == "" ||
    productName.value == "" ||
    productPrice.value == "" ||
    productDesc.value == ""
  ) {
    alert("insert in value");
    return;
  }

  if (productObj.hasOwnProperty(productId.value)) {
    console.log("already in object");
    alert("Product Id is already Exist !");
  } else {
    productObj[productId.value] = {
      id: productId.value,
      name: productName.value,
      img: productImg.value,
      price: productPrice.value,
      desc: productDesc.value,
    };
    localStorage.setItem("productObj", JSON.stringify(productObj));
    alert("success");
    console.log(productObj);
  }
});

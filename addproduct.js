//submit button
const addSubmitBtn = document.querySelector("#addSubmit");

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
  if (productId.value == "") {
    console.log("black");
  }

  if (productObj.hasOwnProperty(productId.value)) {
    console.log("already in object");
    alert("Product Id is already Exist !");
  } else {
    productObj[productId.value] = {
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

//submit button
const addSubmitBtn = document.querySelector("#addSubmit");

function generateId() {
  productId.value = Math.round(Math.random() * 10000 + 1);
}

//form input selector
let imgUrl,
  imgStatus = true,
  imgName;
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

productImg.addEventListener("change", function () {
  const inputImage = new FileReader();

  inputImage.addEventListener("load", () => {
    imgUrl = inputImage.result;
    imgName = this.files[0].name;
  });

  inputImage.readAsDataURL(this.files[0]);
});

addSubmitBtn.addEventListener("click", () => {
  if (
    productId.value == "" ||
    productImg.value == "" ||
    productName.value == "" ||
    productPrice.value == "" ||
    productDesc.value == ""
  ) {
    alert("Please check you input if any is Blank");
    return;
  }

  if (productObj.hasOwnProperty(productId.value)) {
    console.log("already in object");
    alert("Product Id is already Exist !");
  } else {
    console.log(validStatus);
    validation(productName.value, productPrice.value, productDesc.value);
    console.log(validStatus);

    if (
      validStatus["name"] == true &&
      validStatus["price"] == true &&
      validStatus["desc"] == true &&
      imgStatus == true
    ) {
      console.log("all clear");
      productObj[productId.value] = {
        id: productId.value,
        name: productName.value,
        img: imgUrl,
        price: productPrice.value,
        desc: productDesc.value,
      };
      localStorage.setItem("productObj", JSON.stringify(productObj));
      alert("successfully Added");
      console.log(productObj);
    }
    validStatus["name"] = true;
    validStatus["price"] = true;
    validStatus["desc"] = true;
    imgStatus = true;
  }
});

function disappear(place) {
  setTimeout(() => {
    place.classList.remove("border-danger");
  }, 5000);
}

let validatePattern = {
  name: /^[A-Za-z][A-Za-z0-9_]/,
  price: /^[0-9]+|^[0-9]+.[0-9]+/,
  desc: /[A-za-z]+/,
};

let validStatus = {
  name: true,
  price: true,
  desc: true,
};

function validation(name, price, desc) {
  if (!/.(gif|jpg|jpeg|png)/.test(imgName)) {
    imgStatus = false;
    productImg.classList.add("border-danger");
    disappear(productImg);
  }
  for (i in validatePattern) {
    if (i == "name") {
      if (!validatePattern[i].test(name)) {
        validStatus[i] = false;
        productName.classList.add("border-danger");
        disappear(productName);
      }
    } else if (i == "price") {
      if (!validatePattern[i].test(price)) {
        validStatus[i] = false;
        productPrice.classList.add("border-danger");
        disappear(productPrice);
      }
    } else if (i == "desc") {
      if (!validatePattern[i].test(desc)) {
        validStatus[i] = false;
        productDesc.classList.add("border-danger");
        disappear(productDesc);
      }
    }
  }
}

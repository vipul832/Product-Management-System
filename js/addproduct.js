//selected elements
const addSubmitBtn = document.querySelector("#addSubmit");
//Form input selection
const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productImg = document.getElementById("productImg");
const productPrice = document.getElementById("productPrice");
const productDesc = document.getElementById("productDesc");

//Generate Id Function
function generateId() {
  productId.value = Math.round(Math.random() * 10000 + 1);
}

let imgUrl,
  imgStatus = true,
  imgName,
  imgSize;

//getting data from localstorage
let productObj = JSON.parse(localStorage.getItem("productObj"));
//console.log(productObj);
if (productObj == null) {
  localStorage.setItem("productObj", JSON.stringify({}));
}

// add product function
function addProductFunction() {
  //console.log(validStatus);
  validation(productName.value, productPrice.value, productDesc.value);
  //console.log(validStatus);

  if (
    validStatus["name"] == true &&
    validStatus["price"] == true &&
    validStatus["desc"] == true &&
    imgStatus == true
  ) {
    //console.log("all clear");
    productObj = JSON.parse(localStorage.getItem("productObj"));
    if (productObj == null) {
      //console.log("in null");
      localStorage.setItem("productObj", JSON.stringify({}));
      productObj = JSON.parse(localStorage.getItem("productObj"));
      //console.log("obj1", productObj);
    }
    productObj[productId.value] = {
      id: productId.value,
      name: productName.value,
      img: imgUrl,
      price: productPrice.value,
      desc: productDesc.value,
    };
    localStorage.setItem("productObj", JSON.stringify(productObj));
    alert("successfully Added");
    generateId();
    productName.value = "";
    productPrice.value = "";
    productImg.value = "";
    productDesc.value = "";
    //console.log(productObj);
  }
  validStatus["name"] = true;
  validStatus["price"] = true;
  validStatus["desc"] = true;
  imgStatus = true;
}

//Generate URL of image.
productImg.addEventListener("change", function () {
  const inputImage = new FileReader();

  inputImage.addEventListener("load", () => {
    imgUrl = inputImage.result;
    imgName = this.files[0].name;
  });
  imgSize = this.files[0].size / 1000;
  inputImage.readAsDataURL(this.files[0]);
});
generateId();
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
  } else {
    {
      addProductFunction();
    }
  }
});

function disappear(place, element) {
  setTimeout(() => {
    place.classList.remove("border-danger");
    element.innerText = "";
  }, 5000);
}

let validatePattern = {
  name: /^[A-Za-z][A-Za-z0-9_]/,
  price: /[1-9]+[0-9]*$|^[0-9]+.[0-9]+$/,
  desc: /[A-za-z]+/,
};

let validStatus = {
  name: true,
  price: true,
  desc: true,
};

const nameError = document.getElementById("name-error");
const imageError = document.getElementById("image-error");
const priceError = document.getElementById("price-error");
const descError = document.getElementById("desc-error");

function validation(name, price, desc) {
  if (!/.(gif|jpg|jpeg|png)/.test(imgName)) {
    imgStatus = false;
    productImg.classList.add("border-danger");
    imageError.innerText = `Accept only jpeg/png/gif/jpg`;
    disappear(productImg, imageError);
  }
  if (imgSize > 200) {
    imgStatus = false;
    productImg.classList.add("border-danger");
    imageError.innerText = `Accept only Image size less than 200Kb`;
    disappear(productImg, imageError);
  }
  for (i in validatePattern) {
    if (i == "name") {
      if (!validatePattern[i].test(name)) {
        validStatus[i] = false;
        productName.classList.add("border-danger");
        nameError.innerText = `Please Enter the valid Name ${productName.value} (Example: pen,bottle)`;
        disappear(productName, nameError);
      }
    } else if (i == "price") {
      if (!validatePattern[i].test(price)) {
        validStatus[i] = false;
        productPrice.classList.add("border-danger");
        priceError.innerText = `Please Enter the valid price ${productPrice.value} (Example: 15,0.25,25.222)`;
        disappear(productPrice, priceError);
      }
    } else if (i == "desc") {
      if (!validatePattern[i].test(desc)) {
        validStatus[i] = false;
        productDesc.classList.add("border-danger");
        descError.innerText = `Please Enter the valid description ${productDesc.value} (Example: This is pen)`;
        disappear(productDesc, descError);
      }
    }
  }
}

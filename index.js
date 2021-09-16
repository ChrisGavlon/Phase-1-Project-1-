const BASE_URL = "http://localhost:3000/Crypto";
const button = document.querySelector(".calc-button");
let responseData;
fetch(BASE_URL)
  .then((resp) => {
    return resp.json();
  })

  .then(function (cryptoArray) {
    responseData = cryptoArray;
    cryptoArray.forEach((crypto) => {
      renderCryptoDropDown(crypto, "1", "1");
      renderCryptoDropDown(crypto, "2", "2");
    });

    function renderCryptoDropDown(crytpoObj, dropDownID, inputID) {
      // create option or div element where data will go
      // assign a div, class, and textContent
      const cryptoSearchCell = document.createElement("div");
      cryptoSearchCell.className = `dropItem${dropDownID}`;
      cryptoSearchCell.textContent = crytpoObj.name;

      //Method to pass string interpolation value into click event
      cryptoSearchCell.id = inputID;
      console.log(cryptoSearchCell.id);

      //event listener for pasting desired result into search bar
      cryptoSearchCell.addEventListener("click", insertToSearchbar);

      const searchCellLocation = document.querySelector(
        `#myDropDown${dropDownID}`
      );

      // const imageSearchCell = document.createElement("img");
      // imageSearchCell.src = crytpoObj.image;

      // append cryptoSearchCell to SearchCellLocation

      searchCellLocation.appendChild(cryptoSearchCell);

      // cryptoSearchCell.appendChild(imageSearchCell);
    }
  });

function insertToSearchbar(e) {
  const input = document.querySelector(`#myInput${e.target.id}`);
  input.value = this.outerText;
}

button.addEventListener("click", onButtonPress);

function onButtonPress() {
  debugger;
  const inputOne = document.querySelector("#myInput1");
  const inputTwo = document.querySelector("#myInput2");
  let dataPriceA;
  let circSupplyA;
  let marketCapB;
  responseData.forEach((cryptoObj) => {
    if (inputOne.value === cryptoObj.name) {
      dataPriceA = cryptoObj.current_price;
      circSupplyA = cryptoObj.circulating_supply;
    }
    if (inputTwo.value === cryptoObj.name) {
      marketCapB = cryptoObj.market_cap;
    }
  });
  if (marketCapB && dataPriceA && circSupplyA) {
    calculateFunction(dataPriceA, marketCapB, circSupplyA);
  }
}

function calculateFunction(dataPrice, marketCap, circSupply) {
  const displayPrice = document.querySelector(".calculated-price");
  let newPrice = marketCap / circSupply;

  newPrice = Math.round(newPrice * 100) / 100;
  displayPrice.textContent = `$${newPrice}`;
}

// event is triggered when Reset button is clicked

resetBttn.addEventListener("click", resetAll);
function resetAll() {
  const input1 = document.querySelector("#myInput1");
  input1.value = "";

  const input2 = document.querySelector("#myInput2");
  input2.value = "";

  const header = document.querySelector(".calculated-price");
  header.textContent = "Price will go here!";

  const content = document.querySelector(".contentbox-header");
  content.textContent = "Crypto A would have the price of...";
  debugger;
}

function filterFunction(numID) {
  let input, filter, i, div;

  input = document.querySelector(`#myInput${numID}`);
  filter = input.value.toUpperCase();
  div = document.querySelectorAll(`.dropItem${numID}`);

  for (i = 0; i < div.length; i++) {
    txtValue = div[i].textContent || div[i].innerText;
    if (txtValue.toUpperCase().includes(filter)) {
      div[i].style.display = "block";
    } else {
      div[i].style.display = "none";
    }
  }
}

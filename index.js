// const BASE_URL =
//   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false";
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
      const cryptoSearchCell = document.createElement("div");
      // assign a div
      cryptoSearchCell.textContent = crytpoObj.name;

      cryptoSearchCell.id = inputID;
      console.log(cryptoSearchCell.id);

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
  debugger;
  const displayPrice = document.querySelector(".calculated-price");
  let newPrice = marketCap / circSupply;

  displayPrice.textContent = newPrice;
}

function filterFunction(numID) {
  let input, filter, div, i;

  input = document.querySelector(`#myInput${numID}`);
  filter = input.value.toUpperCase();
  div = document.querySelector(`#myDropdown${numID}`);
  div = document.getElementsByTagName("div");

  for (i = 0; i < div.length; i++) {
    txtValue = div[i].textContent || div[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}

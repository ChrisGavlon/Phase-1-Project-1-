// const BASE_URL =
//   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false";

const BASE_URL = "http://localhost:3000/Crypto";

fetch(BASE_URL)
  .then((resp) => {
    return resp.json();
  })

  .then(function (cryptoArray) {
    cryptoArray.forEach((crypto) => {
      renderCryptoDropDown(crypto);
    });
    // cryptoArray.forEach((crypto) => {
    //   renderCryptoDropDown(crypto, "myInput2");
    // });

    function renderCryptoDropDown(crytpoObj) {
      //   console.log(crytpoObj); // now we get the individual objects

      // create option or div element where data will go
      const cryptoSearchCell = document.createElement("div");
      //   cryptoSearchDiv.classList = "cryptoSearchCells";
      cryptoSearchCell.textContent = crytpoObj.name;

      cryptoSearchCell.id = crytpoObj.id;
      console.log(cryptoSearchCell.id);

      cryptoSearchCell.addEventListener("click", insertToSearchbar);

      const searchCellLocation = document.querySelector("#myDropdown");

      const imageSearchCell = document.createElement("img");
      imageSearchCell.src = crytpoObj.image;

      // append cryptoSearchCell to SearchCellLocation

      searchCellLocation.appendChild(cryptoSearchCell);
      cryptoSearchCell.appendChild(imageSearchCell);
    }
  });

function insertToSearchbar(e) {
  debugger;
  const input = document.querySelector("#myInput");
  input.value = this.outerText;
  debugger;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function filterFunction() {
  let input, filter, ul, li, div, i;

  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  div = div.getElementsByTagName("div");

  for (i = 0; i < div.length; i++) {
    txtValue = div[i].textContent || div[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = "";
    } else {
      div[i].style.display = "none";
    }
  }
}

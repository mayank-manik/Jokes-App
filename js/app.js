let search = document.getElementById("search");
let result = document.getElementById("result");
let anyGenre = document.getElementById("anyGenre");
let customGenre = document.getElementById("customGenre");
let programming = document.getElementById("programming");
let misc = document.getElementById("misc");
let dark = document.getElementById("dark");
let pun = document.getElementById("pun");
let spooky = document.getElementById("spooky");
let christmas = document.getElementById("christmas");
let checkbox = document.querySelectorAll(".checkbox");

let str = "",
  str2 = "";
let jokeType = [];

const type = ["twopart", "single"];
let amount = Math.floor(Math.random() * 2);

let url = `https://v2.jokeapi.dev/joke/Any?type=${type[amount]}`;

customGenre.addEventListener("click", () => {
  for (i = 0; i < checkbox.length; i++) {
    checkbox[i].removeAttribute("disabled");
  }
});

anyGenre.addEventListener("click", () => {
  for (i = 0; i < checkbox.length; i++) {
    checkbox[i].setAttribute("disabled", "");
  }
});

search.addEventListener("click", function () {
  result.innerHTML = `<div class="spinner-grow text-primary text-center" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-success text-center" role="status">
      <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-danger text-center" role="status">
      <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-warning text-center" role="status">
      <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-info text-center" role="status">
      <span class="visually-hidden">Loading...</span>
  </div>`;


  const xhr = new XMLHttpRequest();
  if (anyGenre.checked) {
    url = `https://v2.jokeapi.dev/joke/Any?type=${type[amount]}`;
  } else {
    jokeType = [];
    if (programming.checked) {
      jokeType.push("Programming");
    }
    if (misc.checked) {
      jokeType.push("Miscellaneous");
    }
    if (dark.checked) {
      jokeType.push("Dark");
    }
    if (pun.checked) {
      jokeType.push("Pun");
    }
    if (spooky.checked) {
      jokeType.push("Spooky");
    }
    if (christmas.checked) {
      jokeType.push("Christmas");
    }
  }
  if (jokeType.join().length !== 0) {
    url = `https://v2.jokeapi.dev/joke/${jokeType.join()}?type=${type[amount]}`;
  }

  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200 && this.readyState === 4) {
      let obj = JSON.parse(this.responseText);
      if (amount == 0) {
        str = `<li>${obj["setup"]} </li>`;
        str2 = `<li>${obj["delivery"]} </li>`;
        result.innerHTML = "";
        result.innerHTML += str;
        result.innerHTML += str2;
      } else {
        str = `<li>${obj["joke"]} </li>`;
        result.innerHTML = "";
        result.innerHTML += str;
      }
    } else {
      console.log("Some error occured");
      result.innerHTML = `<l1>Please try again. :)</li>`;
    }
  };
  xhr.send();
});

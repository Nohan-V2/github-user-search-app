const $body = document.querySelector("body");

const $logoBtn = document.querySelector(".main-logo");
const $darkModeBtn = document.querySelector(".dark-mode-btn");

const $profilContainer = document.querySelector(".profil-container");

const $searchBarContainer = document.querySelector(".search-bar-container");
const $searchBar = document.querySelector("#search-bar");
const $errorSearchBar = document.querySelector(".error-search-bar");
const $searchBtn = document.querySelector(".search-btn");

const $profilImg = document.querySelector(".profil-img");
const $username = document.querySelector(".username");
const $joinedDate = document.querySelector(".joined-date");
const $arobase = document.querySelector(".arobase");
const $bioProfil = document.querySelector(".bio-profil");

const $reposNumber = document.querySelector(".repos-number");
const $followersNumber = document.querySelector(".followers-number");
const $followingNumber = document.querySelector(".following-number");

const $location = document.querySelector(".location");
const $social = document.querySelector(".social");
const $linkSite = document.querySelector(".link-site");
const $business = document.querySelector(".business");

// console.log($logoBtn);
// console.log($darkModeBtn);
// console.log($profilContainer);
// console.log($searchBarContainer);
// console.log($searchBar);
// console.log($errorSearchBar);
// console.log($searchBtn);
// console.log($profilImg);
// console.log($username);
// console.log($joinedDate);
// console.log($arobase);
// console.log($bioProfil);
// console.log($reposNumber);
// console.log($followersNumber);
// console.log($followingNumber);
// console.log($location);
// console.log($social);
// console.log($linkSite);
// console.log($business);

async function getUser(username) {
  fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetchInformations(data);
    })
    .catch((err) => console.log("Error API " + err));
}

function fetchInformations(data) {
  $profilImg.src = data.avatar_url;
  if (data.name === "null") {
    $username.textContent = "@" + data.login;
  } else {
    $username.textContent = "@" + data.name;
  }
  $joinedDate.textContent = `Joined ${new Date(
    data.created_at
  ).toLocaleDateString()}`;
  $arobase.textContent = data.login;
  $bioProfil.textContent = data.bio;

  $reposNumber.textContent = data.public_repos;
  $followersNumber.textContent = data.followers;
  $followingNumber.textContent = data.following;

  $location.textContent = data.location;
  $social.textContent = data.blog;
  $linkSite.textContent = data.html_url;
  $business.textContent = data.company;
}

$searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  getUser($searchBar.value);
});

$searchBar.addEventListener("input", (e) => {
  e.preventDefault();

  if (e.key === "Enter") {
    getUser($searchBar.value);
  }
});

$darkModeBtn.addEventListener("click", () => {
  $body.classList.toggle("dark");
});

// Grab elements
const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`The item is not founnd . you type ${element}`);
};
//Nav styles on scroll
const scrollHeader = () => {
  const headerElemnt = selectElement("#header");
  if (this.scrollY >= 15) {
    headerElemnt.classList.add("activated");
  } else {
    headerElemnt.classList.remove("activated");
  }
};

window.addEventListener("scroll", scrollHeader);
// Open menu & search pop-up
const menuToggleIcon = selectElement("#menu-toggle-icon");

const toggleMenu = () => {
  const mobileMenu = selectElement("#menu");
  mobileMenu.classList.toggle("activated");
  menuToggleIcon.classList.toggle("activated"); // classList must be small letter
};
menuToggleIcon.addEventListener("click", toggleMenu);
// Open/Close search form popup

const formOpenBtn = selectElement("#search-icon");
const formClosenBtn = selectElement("#form-close-btn");
const serchFormContainer = selectElement("#search-form-container");

formOpenBtn.addEventListener("click", () =>
  serchFormContainer.classList.add("activated")
);
formClosenBtn.addEventListener("click", () =>
  serchFormContainer.classList.remove("activated")
);
// -- Close the search form popup on Shift keypress
window.addEventListener("keyup", (event) => {
  if (event.key == "Shift") serchFormContainer.classList.remove("activated");
});
// Switch theme/add to local storage

// Switch theme/add to local storage
const bodyElement = document.body;
const themetogglebtn = selectElement("#theme-toggle-btn");
const currentTheme = localStorage.getItem("currentTheme");
if (currentTheme) {
  bodyElement.classList.add("light-theme");
}

themetogglebtn.addEventListener("click", () => {
  bodyElement.classList.toggle("light-theme");
  if (bodyElement.classList.contains("light-theme")) {
    localStorage.setItem("currentTheme", "themeActive");
  } else {
    localStorage.removeItem("currentTheme");
  }
});

// Swiper
const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // Ensure pagination is clickable
  },
  breakpoints: {
    700: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});

// Image API
// Image API
const accessKey = "BAuNpkjvCfu-w1FJMZv7r_8GeTpZJsuA2y-4NoH01q0";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const imageCardsContainer = document.getElementById("image-cards-container");
const showMore = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function fetchImages(query, page) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function createImageCard(imageData, index) {
  const card = document.createElement("div");
  card.classList.add("trending-news-box", "card");

  const cardLink = document.createElement("a");
  cardLink.href = imageData.links.html;
  cardLink.target = "_blank"; // open in new tab
  cardLink.classList.add("card-link", "old-featured-articles");

  cardLink.innerHTML = `
    <div class="old-article-data-container article-data-container">
      <div class="old-article-data article-data">
        <span>${new Date(imageData.created_at).toLocaleDateString()}</span>
        <span class="article-data-spacer"></span>
        <span>Photo by ${imageData.user.name}</span>
      </div>
      <div class="trending-picture-data">
        <h3 class="image-titles title">${
          imageData.alt_description || "Sample Picture"
        }</h3>
      </div>
    </div>
    <div class="trending-news-image-box">
      <span class="trending-number">${index + 1}</span>
      <img src="${imageData.urls.small}" alt="${
    imageData.alt_description || "Image"
  }" class="article-image" />
    </div>
  `;

  const sourceInfo = document.createElement("div");
  sourceInfo.classList.add("image-come-from");

  card.appendChild(cardLink);
  card.appendChild(sourceInfo);

  return card;
}

async function displayImages(query, page, updateAll = true) {
  const results = await fetchImages(query, page);

  if (updateAll) {
    imageCardsContainer.innerHTML = "";
    results.forEach((result, index) => {
      const card = createImageCard(result, index);
      imageCardsContainer.appendChild(card);
      // Add a delay for the animation
      setTimeout(() => card.classList.add("show"), index * 100);
    });
  } else {
    const lastCardIndex = imageCardsContainer.children.length - 1;
    const result = results[0]; // Only change the last card
    const newCard = createImageCard(result, lastCardIndex);
    imageCardsContainer.replaceChild(
      newCard,
      imageCardsContainer.children[lastCardIndex]
    );
    setTimeout(() => newCard.classList.add("show"), 2); // Add animation for the new card
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  keyword = searchBox.value;
  page = 1;
  displayImages(keyword, page);
});

showMore.addEventListener("click", () => {
  page++;
  displayImages(keyword, page, false);
});

// Load default images on page load
window.addEventListener("load", () => displayImages("nature", 1));

//news API
const newsApI_key = "52927c3833b541d3850aa9ffa1bf9397";
const newsUrl = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
  const res = await fetch(`${newsUrl}${query}&apiKey=${newsApI_key}`);
  const data = await res.json();
  const shuffledArticles = shuffleArray(data.articles);
  bindData(shuffledArticles);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function bindData(articles) {
  const cardContainer = document.getElementById("cardcontainer");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardContainer.innerHTML = "";

  // Limit the number of articles to 10
  const articlesToShow = articles.slice(0, 10);

  articlesToShow.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillDataCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newTitile = cardClone.querySelector("#news-title");
  const sourceNes = cardClone.querySelector("#news-source");
  const sourcedescrip = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newTitile.innerHTML = `${article.title.slice(0, 60)}`;
  sourcedescrip.innerHTML = `${article.description.slice(0, 150)}..`;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  sourceNes.innerHTML = `${article.source.name} . ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const trendingNewsSection = document.getElementById("trending-news-section");
  if (!trendingNewsSection) return;

  const banners = trendingNewsSection.querySelectorAll(".headline-banner");
  const prevButton = trendingNewsSection.querySelector(".swiper-button-prev");
  const nextButton = trendingNewsSection.querySelector(".swiper-button-next");
  let currentIndex = 0;

  function showBanner(index) {
    banners.forEach((banner, i) => {
      banner.classList.toggle("active", i === index);
    });
  }

  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + banners.length) % banners.length;
    showBanner(currentIndex);
  });

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % banners.length;
    showBanner(currentIndex);
  });

  // Initially show the first banner
  showBanner(currentIndex);
});
document.addEventListener("DOMContentLoaded", function () {
  let currentSectionIndex = 0;
  const sections = document.querySelectorAll(
    "#sections-container > .headline-banner-tt"
  );
  const totalSections = sections.length;

  function showSection(index) {
    sections.forEach((section, i) => {
      section.style.display = i === index ? "block" : "none";
    });
  }

  document
    .querySelector(".swiper-button-prev.swiper-controls-news")
    .addEventListener("click", function () {
      currentSectionIndex =
        (currentSectionIndex - 1 + totalSections) % totalSections;
      showSection(currentSectionIndex);
    });

  document
    .querySelector(".swiper-button-next.swiper-controls-news")
    .addEventListener("click", function () {
      currentSectionIndex = (currentSectionIndex + 1) % totalSections;
      showSection(currentSectionIndex);
    });

  showSection(currentSectionIndex); // Show the default section
});

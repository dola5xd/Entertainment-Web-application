const swiperWipper = document.querySelector(".swiper-wrapper");
const recContainer = document.querySelector(".recomended-container");
const searchContainer = document.querySelector(".search-container");
const mainDiv = document.querySelector("main");
const searchInput = document.getElementById("search_input");
const pages = document.querySelectorAll(".menu_pages a");
const loader = document.querySelector(".loader");
const user = document.getElementById("user");

// To check width
const checkDevice = window.innerWidth >= 1024 ? "largeDevice" : "smallDevice";

const loaderFunction = function () {
  setTimeout(() => {
    loader.classList.add("-translate-y-full");
    mainDiv.classList.remove("hidden");
    setTimeout(() => {
      mainDiv.classList.remove("opacity-0");
      loader.classList.add("hidden");
    }, 500);
    if (document.querySelector(".sign-in") != undefined)
      document.querySelector(".sign-in").classList.remove("opacity-0");
    if (document.querySelector(".sign-up") != undefined)
      document.querySelector(".sign-up").classList.remove("opacity-0");
  }, 3000);
};

const bookmarked = function (parent = ".movie-card") {
  callJson().then((data) => {
    data.forEach((e) => {
      if (e.isBookmarked) {
        document.querySelectorAll(`${parent} .title`).forEach((el) => {
          if (e.title == el.textContent.trim()) {
            el.parentElement.parentElement
              .querySelector("span .bookmark")
              .classList.add("active");
          }
        });
      }
    });
  });
};

const swiper = new Swiper(".swiper", {
  grabCursor: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  autoplay: {
    delay: 3000,
  },
});

pages.forEach((el) => {
  el.addEventListener("click", (e) => {
    pages.forEach((e) => e.classList.remove("active"));
    if (e.target.parentElement.parentElement.tagName == "A")
      e.target.parentElement.parentElement.classList.add("active");
    else if (e.target.parentElement.tagName == "A")
      e.target.parentElement.classList.add("active");
    else e.target.classList.add("active");

    // Know the page
    const page = el.getAttribute("data-href").split("#")[1];
    if (page == "home") {
      location.reload();
    } else if (page == "movie") importMovie();
    else if (page == "tv") importTv();
    else if (page == "bookmark") importBookmark();
  });
});

const callJson = async function () {
  const res = await fetch("./assets/js/data.json");
  const data = await res.json();
  return data;
};

const importTrending = function () {
  callJson().then((data) => {
    data.forEach((e) => {
      if (e.isTrending) {
        // Slide component
        const slide = `
        <div class="swiper-slide relative  bg-${e.title
          .split(" ")[0]
          .toLowerCase()}">
        <span class="absolute z-[50] right-[20px] top-[15px]">
          <button class="bookmark rounded-full bg-GreyishBlue p-[10px]" onclick="bookmark()">
            <svg
              width="12"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                stroke="#FFF"
                stroke-width="1.5"
                fill="none"
              />
            </svg></button
        ></span>
        <div class="absolute bottom-[25px] left-5 info">
          <span
            class="flex gap-[15px] text-white text-[15px] tablet:text-[12px] font-light opacity-[75%]"
          >
            <h3 class="relese-year relative">${e.year}</h3>
        
            <h3 class="type relative">
              <div class="flex items-center gap-2">
                <span id="type_icon"
                  ><img
                    src="./assets/images/icon-category-${e.category
                      .split(" ")
                      .join("-")
                      .toLowerCase()}.svg"
                     /></span
                >${e.category}
              </div>
            </h3>
        
            <h3 class="rating relative">${e.rating}</h3>
          </span>
          <h1 class="title text-[18px] tablet:text-[24px] text-white font-medium">
            ${e.title}
          </h1>
        </div>
        <div class="play">
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
            fill="#FFF"
          />
        </svg>
        <span>Play</span>
      </div>
        </div>
        `;

        swiperWipper.insertAdjacentHTML("afterbegin", slide);
      }
    });
  });
  bookmarked(".swiper-slide");
};

const imporRecomndation = function () {
  callJson().then((data) => {
    data.forEach((e) => {
      if (!e.isTrending) {
        const card = `
      <div class="movie-card relative cursor-pointer">
      <img
        src="${
          checkDevice == "largeDevice"
            ? e.thumbnail.regular.large
            : e.thumbnail.regular.small
        }"
        alt="thumbnails"
        class="rounded-[8px] tablet:w-full"
      />
      <span class="absolute right-[10px] top-[10px]">
          <button class="bookmark rounded-full bg-GreyishBlue p-[10px]" onclick="bookmark()">
            <svg
              width="12"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                stroke="#FFF"
                stroke-width="1.5"
                fill="none"
              />
            </svg></button
        ></span>
      <div class="text">
        <span
          class="flex gap-[5px] py-[10px] text-white text-[15px] tablet:text-[12px] text-nowrap font-light opacity-[75%] info"
        >
          <h3 class="relese-year relative">${e.year}</h3>
    
          <h3 class="type relative">
            <div class="flex items-center gap-2">
              <span id="type_icon"
                ><img
                  src="./assets/images/icon-category-${e.category
                    .split(" ")
                    .join("-")
                    .toLowerCase()}.svg" /></span
              >${e.category}
            </div>
          </h3>
    
          <h3 class="rating relative">${e.rating}</h3>
        </span>
        <h1 class="title text-[18px] laptop:text-[20px] text-white font-medium">
          ${e.title}
        </h1>
      </div>    <div class="play">
      <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
          fill="#FFF"
        />
      </svg>
      <span>Play</span>
    </div>
    </div>`;
        recContainer.insertAdjacentHTML("afterbegin", card);
      }
    });
  });
  bookmarked();
};

const bookmark = () =>
  document
    .querySelectorAll(".bookmark")
    .forEach((e) =>
      e == window.event.target ||
      e == window.event.target.parentElement.parentElement ||
      e == window.event.target.parentElement
        ? e.classList.toggle("active")
        : ""
    );

const importSearch = function (value) {
  if (value != "") {
    callJson().then((data) => {
      let Result = data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      if (Result.length > 0) {
        Result.forEach((e) => {
          const card = `
      <div class="movie-card relative cursor-pointer">
      <img
      src="${
        checkDevice == "largeDevice"
          ? e.thumbnail.regular.large
          : e.thumbnail.regular.small
      }"
      alt="thumbnails"
        class="rounded-[8px] w-full"
      />
      <span class="absolute right-[10px] top-[10px]">
          <button class="bookmark rounded-full bg-GreyishBlue p-[10px]" onclick="bookmark()">
            <svg
              width="12"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                stroke="#FFF"
                stroke-width="1.5"
                fill="none"
              />
            </svg></button
        ></span>
      <div class="text">
        <span
          class="flex gap-[5px] py-[10px] text-white text-[15px] tablet:text-[12px] text-nowrap font-light opacity-[75%] info"
        >
          <h3 class="relese-year relative">${e.year}</h3>
    
          <h3 class="type relative">
            <div class="flex items-center gap-2">
              <span id="type_icon"
                ><img
                  src="./assets/images/icon-category-${e.category
                    .split(" ")
                    .join("-")
                    .toLowerCase()}.svg" /></span
              >${e.category}
            </div>
          </h3>
    
          <h3 class="rating relative">${e.rating}</h3>
        </span>
        <h1 class="title text-[20px] tablet:text-[18px] text-white font-medium">
          ${e.title}
        </h1>
      </div>
      <div class="play">
      <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
          fill="#FFF"
        />
      </svg>
      <span>Play</span>
    </div>
    </div>`;
          searchContainer.insertAdjacentHTML("afterbegin", card);
          document.querySelector(
            ".search-header"
          ).textContent = `Found ${Result.length} results for ‘${value}’`;
        });
      } else {
        document.querySelector(
          ".search-header"
        ).textContent = `Found 0 results for ‘${value}’`;
      }
    });
  } else {
    mainDiv.childNodes.forEach((e) =>
      e.tagName == "DIV" ? e.classList.remove("hidden") : ""
    );
    searchContainer.parentElement.classList.add("hidden");
  }
  bookmarked();
};

searchInput.oninput = (e) => {
  let value = e.target.value;
  mainDiv.childNodes.forEach((e) =>
    e.tagName == "DIV" ? e.classList.add("hidden") : ""
  );
  searchContainer.parentElement.classList.remove("hidden");
  searchContainer.textContent = "";
  importSearch(value);
};

loaderFunction();
importTrending();
imporRecomndation();

const importMovie = function () {
  mainDiv.classList.add("hidden");
  loader.classList.remove("-translate-y-full");

  mainDiv.childNodes.forEach((e) => {
    if (e.classList != undefined) {
      !e.classList.contains("search") ? e.remove() : "";
    }
  });
  const moviesDiv = `
    <div class="movies">
    <h1 class="movies-header font-light text-[24px] tracking-[0.5px] text-white p-[20px] capitalize">
        Movies
    </h1>
    <div class="movies-container"></div>
</div>
    `;
  callJson().then((data) => {
    data.forEach((e) => {
      if (e.category == "Movie") {
        const card = `
              <div class="movie-card relative cursor-pointer">
              <img
              src="${
                checkDevice == "largeDevice"
                  ? e.thumbnail.regular.large
                  : e.thumbnail.regular.small
              }"
              alt="thumbnails"
                class="rounded-[8px]"
              />
              <span class="absolute right-[10px] top-[10px]">
                  <button class="bookmark rounded-full bg-GreyishBlue p-[10px]" onclick="bookmark()">
                    <svg
                      width="12"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                        stroke="#FFF"
                        stroke-width="1.5"
                        fill="none"
                      />
                    </svg></button
                ></span>
              <div class="text">
                <span
                  class="flex gap-[5px] py-[10px] text-white text-[15px] text-nowrap font-light opacity-[75%] info"
                >
                  <h3 class="relese-year relative">${e.year}</h3>
            
                  <h3 class="type relative">
                    <div class="flex items-center gap-2">
                      <span id="type_icon"
                        ><img
                          src="./assets/images/icon-category-${e.category
                            .split(" ")
                            .join("-")
                            .toLowerCase()}.svg" /></span
                      >${e.category}
                    </div>
                  </h3>
            
                  <h3 class="rating relative">${e.rating}</h3>
                </span>
                <h1 class="title text-[20px] tablet:text-[18px] text-white font-medium">
                  ${e.title}
                </h1>
              </div>
              <div class="play">
              <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
                  fill="#FFF"
                />
              </svg>
              <span>Play</span>
            </div>
            </div>`;
        document
          .querySelector(".movies-container")
          .insertAdjacentHTML("afterbegin", card);
      }
    });
  });

  mainDiv.insertAdjacentHTML("afterbegin", moviesDiv);
  bookmarked();

  loaderFunction();
};

const importTv = function () {
  mainDiv.classList.add("hidden");
  loader.classList.remove("-translate-y-full");

  mainDiv.childNodes.forEach((e) => {
    if (e.classList != undefined) {
      !e.classList.contains("search") ? e.remove() : "";
    }
  });
  const TVDiv = `
  <div class="tv">
  <h1 class="tv-header font-light text-[24px] tracking-[0.5px] text-white p-[20px] capitalize">
  TV Series
  </h1>
  <div class="tv-container"></div>
</div>
  `;
  callJson().then((data) => {
    data.forEach((e) => {
      if (e.category == "TV Series") {
        const card = `
        <div class="movie-card relative cursor-pointer">
        <img
        src="${
          checkDevice == "largeDevice"
            ? e.thumbnail.regular.large
            : e.thumbnail.regular.small
        }"
          alt="thumbnails"
          class="rounded-[8px]"
        />
        <span class="absolute right-[10px] top-[10px]">
            <button class="bookmark rounded-full bg-GreyishBlue p-[10px]" onclick="bookmark()">
              <svg
                width="12"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                  stroke="#FFF"
                  stroke-width="1.5"
                  fill="none"
                />
              </svg></button
          ></span>
        <div class="text">
          <span
            class="flex gap-[5px] py-[10px] text-white text-[15px] tablet:text-[12px] text-nowrap font-light opacity-[75%] info"
          >
            <h3 class="relese-year relative">${e.year}</h3>
        
            <h3 class="type relative">
              <div class="flex items-center gap-2">
                <span id="type_icon"
                  ><img
                    src="./assets/images/icon-category-${e.category
                      .split(" ")
                      .join("-")
                      .toLowerCase()}.svg" /></span
                >${e.category}
              </div>
            </h3>
        
            <h3 class="rating relative">${e.rating}</h3>
          </span>
          <h1 class="title text-[20px] tablet:text-[18px] text-white font-medium">
            ${e.title}
          </h1>
        </div>
        <div class="play">
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
            fill="#FFF"
          />
        </svg>
        <span>Play</span>
      </div>
        </div>`;
        document
          .querySelector(".tv-container")
          .insertAdjacentHTML("afterbegin", card);
      }
    });
  });
  mainDiv.insertAdjacentHTML("afterbegin", TVDiv);
  bookmarked();
  loaderFunction();
};

const importBookmark = function () {
  mainDiv.classList.add("hidden");
  loader.classList.remove("-translate-y-full");

  mainDiv.childNodes.forEach((e) => {
    if (e.classList != undefined) {
      !e.classList.contains("search") ? e.remove() : "";
    }
  });
  const TVDiv = `
  <div>
  <div class="bookmark-movie">
    <h1
      class="bookmark-header font-light text-[24px] tracking-[0.5px] text-white p-[20px] capitalize"
    >
      Bookmarked Movies
    </h1>
    <div class="bookmark-movie-container"></div>
  </div>

  <div class="bookmark-tv">
    <h1
      class="bookmark-header font-light text-[24px] tracking-[0.5px] text-white p-[20px] capitalize"
    >
      Bookmarked TV Series
    </h1>
    <div class="bookmark-Tv-container"></div>
  </div>
</div>
  `;
  callJson().then((data) => {
    data.forEach((e) => {
      if (e.isBookmarked && e.category == "Movie") {
        const card = `
        <div class="movie-card relative cursor-pointer">
        <img
        src="${
          checkDevice == "largeDevice"
            ? e.thumbnail.regular.large
            : e.thumbnail.regular.small
        }"
        alt="thumbnails"
          class="rounded-[8px]"
        />
        <span class="absolute right-[10px] top-[10px]">
            <button class="bookmark rounded-full bg-GreyishBlue p-[10px]" onclick="bookmark()">
              <svg
                width="12"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                  stroke="#FFF"
                  stroke-width="1.5"
                  fill="none"
                />
              </svg></button
          ></span>
        <div class="text">
          <span
            class="flex gap-[5px] py-[10px] text-white text-[15px] text-nowrap font-light opacity-[75%] info"
          >
            <h3 class="relese-year relative">${e.year}</h3>
      
            <h3 class="type relative">
              <div class="flex items-center gap-2">
                <span id="type_icon"
                  ><img
                    src="./assets/images/icon-category-${e.category
                      .split(" ")
                      .join("-")
                      .toLowerCase()}.svg" /></span
                >${e.category}
              </div>
            </h3>
      
            <h3 class="rating relative">${e.rating}</h3>
          </span>
          <h1 class="title text-[20px] tablet:text-[18px] text-white font-medium">
            ${e.title}
          </h1>
        </div>
        <div class="play">
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
            fill="#FFF"
          />
        </svg>
        <span>Play</span>
      </div>
      </div>`;
        document
          .querySelector(".bookmark-movie-container")
          .insertAdjacentHTML("afterbegin", card);
      } else if (e.isBookmarked && e.category == "TV Series") {
        const card = `
        <div class="movie-card relative cursor-pointer">
        <img
        src="${
          checkDevice == "largeDevice"
            ? e.thumbnail.regular.large
            : e.thumbnail.regular.small
        }"
          alt="thumbnails"
          class="rounded-[8px]"
        />
        <span class="absolute right-[10px] top-[10px]">
            <button class="bookmark rounded-full bg-GreyishBlue p-[10px]" onclick="bookmark()">
              <svg
                width="12"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                  stroke="#FFF"
                  stroke-width="1.5"
                  fill="none"
                />
              </svg></button
          ></span>
        <div class="text">
          <span
            class="flex gap-[5px] py-[10px] text-white text-[15px] tablet:text-[12px] text-nowrap font-light opacity-[75%] info"
          >
            <h3 class="relese-year relative">${e.year}</h3>
        
            <h3 class="type relative">
              <div class="flex items-center gap-2">
                <span id="type_icon"
                  ><img
                    src="./assets/images/icon-category-${e.category
                      .split(" ")
                      .join("-")
                      .toLowerCase()}.svg" /></span
                >${e.category}
              </div>
            </h3>
        
            <h3 class="rating relative">${e.rating}</h3>
          </span>
          <h1 class="title text-[20px] tablet:text-[18px] text-white font-medium">
            ${e.title}
          </h1>
        </div>
        <div class="play">
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
            fill="#FFF"
          />
        </svg>
        <span>Play</span>
      </div>
        </div>`;
        document
          .querySelector(".bookmark-Tv-container")
          .insertAdjacentHTML("afterbegin", card);
      }
    });
  });
  mainDiv.insertAdjacentHTML("afterbegin", TVDiv);
  bookmarked();
  loaderFunction();
};

const signIn = function () {
  document.querySelector("header").classList.add("hidden");
  mainDiv.classList.add("hidden");
  loader.classList.remove("-translate-y-full");
  document.querySelector(".sign-up") != undefined
    ? document.querySelector(".sign-up").remove()
    : "";

  mainDiv.childNodes.forEach((e) => {
    if (e.classList != undefined) {
      !e.classList.contains("search") ? e.remove() : "";
    }
  });

  document.querySelector("header").classList.add("hidden");
  const signInDiv = `    
  <div class="sign-in duration-500 opacity-0 flex flex-col justify-center items-center">
  <div class="logo mt-[100px]">
    <img src="./assets/images/logo.svg" alt="logo" />
  </div>
  <div
    class="mt-[75px] py-[50px] px-[20px] min-w-[400px] bg-semiDarkBlue rounded-[20px] scale-[0.6] tablet:scale-100"
  >
    <form class="flex flex-col justify-center gap-[20px]">
      <h1
        class="text-white font-light text-[32px] tracking-[-0.5px] py-[5px]"
      >
        Login
      </h1>
      <input
        type="email"
        placeholder="Email address"
        class="w-full bg-transparent pl-[5px] py-[10px] font-light text-white capitalize text-[18px] border-b duration-500 outline-0 focus:border-b border-GreyishBlue focus:border-white caret-red"
        id="signInEmail"
        oninput="inValid('email')"
        />
      <input
        type="password"
        placeholder="Password"
        class="w-full bg-transparent pl-[5px] py-[10px] font-light text-white capitalize text-[18px] border-b duration-500 outline-0 focus:border-b border-GreyishBlue focus:border-white caret-red"
        id="signInPass"
        oninput="inValid()"
        />
      <button
        class="bg-red rounded-[6px] text-white font-light text-[15px] py-[10px] duration-500 hover:opacity-75"
        onclick="inValid('submit')"
        >
        Login to your account
      </button>
      <span class="text-center text-white font-light text-[15px]"
        >Don’t have an account?
        <button onclick="signUp();preventDefault()
        " class="text-red">Sign Up</button></span
      >
    </form>
  </div>
</div>`;
  document.body.insertAdjacentHTML("afterbegin", signInDiv);
  document.querySelector(".sign-in form").onsubmit = (e) => e.preventDefault();
  loaderFunction();
};

const signUp = function () {
  mainDiv.classList.add("hidden");
  loader.classList.remove("-translate-y-full");
  document.querySelector(".sign-in") != undefined
    ? document.querySelector(".sign-in").remove()
    : "";
  mainDiv.childNodes.forEach((e) => {
    if (e.classList != undefined) {
      !e.classList.contains("search") ? e.remove() : "";
    }
  });

  const signUpDiv = `    
  <div class="sign-up duration-500 opacity-0 flex flex-col justify-center items-center">
  <div class="logo mt-[100px]">
    <img src="./assets/images/logo.svg" alt="logo" />
  </div>
  <div
    class="mt-[75px] py-[50px] px-[20px] min-w-[400px] bg-semiDarkBlue rounded-[20px] scale-[0.6] tablet:scale-100"
  >
    <form class="flex flex-col justify-center gap-[20px]">
      <h1
        class="text-white font-light text-[32px] tracking-[-0.5px] py-[5px]"
      >
      Sign Up
      </h1>
      <input
        type="email"
        placeholder="Email address"
        class="w-full bg-transparent pl-[5px] py-[10px] font-light text-white capitalize text-[18px] border-b border-transparent duration-500 outline-0 focus:border-b border-GreyishBlue focus:border-white caret-red"
      />
      <input
        type="password"
        placeholder="Password"
        class="w-full bg-transparent pl-[5px] py-[10px] font-light text-white capitalize text-[18px] border-b border-transparent duration-500 outline-0 focus:border-b border-GreyishBlue focus:border-white caret-red"
      />
      <input
        type="password"
        placeholder="Repeat password"
        class="w-full bg-transparent pl-[5px] py-[10px] font-light text-white capitalize text-[18px] border-b border-transparent duration-500 outline-0 focus:border-b border-GreyishBlue focus:border-white caret-red"
      />
      <button
        class="bg-red rounded-[6px] text-white font-light text-[15px] py-[10px] duration-500 hover:opacity-75"
      >
      Create an account
      </button>
      <span class="text-center text-white font-light text-[15px]"
        >Already have an account?
        <button onclick="signIn()" class="text-red">Login</button></span
      >
    </form>
  </div>
</div>`;
  document.body.insertAdjacentHTML("afterbegin", signUpDiv);
  document.querySelector(".sign-up form").onsubmit = (e) => e.preventDefault();
  loaderFunction();
};

user.addEventListener("click", () => {
  signIn();
  loaderFunction();
});

const inValid = function (type) {
  const signInEmail = document.getElementById("signInEmail");
  const signInPass = document.getElementById("signInPass");
  if (type == "email") {
    const email = signInEmail.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    email == null
      ? signInEmail.classList.add("invalid")
      : signInEmail.classList.remove("invalid");
  } else if (type == "submit") {
    if (
      !signInEmail.classList.contains("invalid") &&
      !signInPass.classList.contains("invalid")
    ) {
      location.reload();
    }
  } else {
    const password = signInPass.value.length >= 8 ? signInPass.value : null;
    password == null
      ? signInPass.classList.add("invalid")
      : signInPass.classList.remove("invalid");
  }
};

const rootElem = document.getElementById("root");
let dropDown = document.getElementById("dpmenu");
const allEpisodes = getAllEpisodes();
let searchBar = document.getElementById("search");
let searchShow = document.getElementById("searching2");
const gOTShows = getAllShows().sort((a, b) =>
  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
);
function setup() {
  makePageForShows(gOTShows);
  searchShows(gOTShows);
  // fetching(527);
}

function makePageForEpisodes(episodeList) {
  dropDown.style.display = "block";
  searchBar.style.display = "block";
  searchShow.style.display = "none";
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach((element) => {
    const container = document.createElement("div");
    container.className = "GOTEps";
    const container2 = document.createElement("header");
    const container3 = document.createElement("img");
    const container4 = document.createElement("p");
    container2.innerText = `${element.name} - S0${element.season}E${
      element.number < 10 ? "0" + element.number : element.number
    }`;
    container3.src = element.image.medium;
    container4.innerHTML = element.summary;
    container.append(container2, container3, container4);
    rootElem.append(container);
  });
}
let searchEps = (episodes) => {
  searchBar.addEventListener("input", (e) => {
    let userInput = e.target.value.toLowerCase();
    let filerEps = episodes.filter((e) => {
      return (
        e.name.toLowerCase().includes(userInput) ||
        e.summary.toLowerCase().includes(userInput)
      );
    });
    rootElem.innerHTML = "";
    makePageForEpisodes(filerEps);
  });
};
// searchEps(allEpisodes);

// DROP DOWN MENU //

let dropDownMenu = (episodes) => {
  dropDown.innerHTML = "";
  let seeAll = document.createElement("option");
  seeAll.value = "see-all";
  seeAll.innerHTML = "See All";
  dropDown.append(seeAll);
  episodes.forEach((e) => {
    let option = document.createElement("option");

    option.setAttribute("value", e.name);
    // console.log(option.value);
    option.innerHTML = `S0${e.season}E${
      e.number < 10 ? "0" + e.number : e.number
    }- ${e.name}`;
    dropDown.append(option);
  });

  dropDown.addEventListener("change", (event) => {
    rootElem.innerHTML = "";
    let selectIn = episodes.filter((epi) => {
      return epi.name === event.target.value;
    });

    event.target.value === "see-all"
      ? makePageForEpisodes(episodes)
      : makePageForEpisodes(selectIn);
  });
};
// dropDownMenu(allEpisodes);



let fetching = (showId) => {
  fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      makePageForEpisodes(data);
      dropDownMenu(data);
      searchEps(data);
    });
};

let dropDownShow = (gotshow) => {
  let shows = document.getElementById("showsmenu");
  gotshow.forEach((show) => {
    let option = document.createElement("option");

    option.setAttribute("value", show.id);
    // console.log(option.value);
    option.innerHTML = show.name;
    shows.append(option);
  });

  shows.addEventListener("change", (eventChecker) => {
    let theShowId = eventChecker.target.value;
    rootElem.innerHTML = "";
    fetching(theShowId);
    eventChecker.target.value === "see-all"
      ? makePageForShows(gotshow)
      : makePageForEpisodes(selectIn);
  });
};
dropDownShow(gOTShows);

// level 500 //

function makePageForShows(showList) {
  dropDown.style.display = "none";
  searchBar.style.display = "none";
  searchShow.style.display = "block";
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  showList.forEach((element) => {
    const container = document.createElement("div");
    container.className = "GOTEps";
    const container2 = document.createElement("header");
    const container3 = document.createElement("img");
    const container4 = document.createElement("p");
    container2.innerText = `${element.name}`;
    container3.src = element.image.medium;
    container4.innerHTML = element.summary;
    container.append(container2, container3, container4);
// new div // 
const extraElements = document.createElement("div")
const rated = document.createElement("p");
const genres = document.createElement("p");
const status = document.createElement("p");
const runtime = document.createElement("p");

    rootElem.append(container);
  });
}

let searchShows = (show) => {
  searchShow.addEventListener("input", (e) => {
    let userInput = e.target.value.toLowerCase();
    let filerEps = show.filter((e) => {
      return (
        e.name.toLowerCase().includes(userInput) ||
        e.summary.toLowerCase().includes(userInput) ||
        e.genres.join(" ").toLowerCase().includes(userInput)
      );
    });
    rootElem.innerHTML = "";
    makePageForShows(filerEps);
    console.log(filerEps);
  });
};

window.onload = setup();

  const rootElem = document.getElementById("root");
  const allEpisodes = getAllEpisodes();
  function setup() {
  
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
 
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach(element => {
    const container = document.createElement('div')
    container.className = 'GOTEps'
     const container2 = document.createElement('header')
      const container3 = document.createElement('img')
       const container4 = document.createElement('p')
       container2.innerText = `${element.name} - S0${element.season}E${
      element.number < 10 ? "0" + element.number : element.number
    }`
       container3.src = element.image.medium
       container4.innerHTML = element.summary
       container.append(container2,container3,container4);
       rootElem.append(container)
  });
}
let searchEps = (episodes) => {
  let searchBar = document.getElementById("search");
  searchBar.addEventListener("input", (e) => {
   let userInput = e.target.value.toLowerCase()
   let filerEps = episodes.filter((e) =>{
    return e.name.toLowerCase().includes(userInput) || e.summary.toLowerCase().includes(userInput)
   });
   rootElem.innerHTML = '';
   makePageForEpisodes(filerEps);
  });
}
searchEps(allEpisodes)

// 100 done, 200 done,

window.onload = setup;


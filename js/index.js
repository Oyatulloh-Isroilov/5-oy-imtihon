// https://www.omdbapi.com/?s=avengers&page=1&apikey=5b33d320
// https://www.omdbapi.com/?i=tt3896198&apikey=5b33d320

const movieSearchBox = document.getElementById("movieSearchBox");
const searchList = document.getElementById("searchList");
const resultGrid = document.getElementById("resultGrid");

async function loadMovies(searchTerm) {
  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=5b33d320`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 1) {
    searchList.classList.remove("hideSearchList");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hideSearchList");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[i].imdbID;
    movieListItem.classList.add("searchListItem");
    if (movies[i].Poster != "N/A") moviePoster = movies[i].Poster;
    else moviePoster = "not_found.jpg";

    movieListItem.innerHTML = `
    <div class="searchItemThumbnail">
        <img src="${moviePoster}">
    </div>
    <div class="searchItemInfo">
        <h3>${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
    </div>
    `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".searchListItem");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add("hideSearchList");
      movieSearchBox.value = "";
      const res = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=5b33d320`
      );
      const movieDetails = await res.json();
      // console.log(movieDetails);
      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = `
      <div class="moviePoster">
      <img src="${
        details.Poster != "N/A" ? details.Poster : "not_found.jpg"
      }" alt="marvel">
    </div>
    <div class="movieInfo">
      <h3 class="movieTitle"> ${details.Title}</h3>
      <ul class="movieMiscInfo">
          <li class="year"> ${details.Year}</li>
          <li class="rated">Ratings: ${details.Rated}</li>
          <li class="released">Released: ${details.Released}</li>
      </ul>
      <p class="genre"> <b>Genre:</b> ${details.Genre}</p>
      <p class="writer"><b>Writer</b> ${details.Writer}</p>
      <p class="actors"><b>Actors:</b> ${details.Actors}</p>
      <p class="plot"><b>Plot:</b> ${details.Plot}</p>
      <p class="language"><b>Language: </b> ${details.Language} </p>
      <p class="awards"><b><i class="fa-solid fa-award"></i></b> ${
        details.Awards
      } </p>
    </div>
  `;
}

window.addEventListener("click", (event) => {
  if (event.target.className != "formControl") {
    searchList.classList.add("hideSearchList");
  }
});

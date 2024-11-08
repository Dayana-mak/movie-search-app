const searchInputNode = document.getElementById("searchInput");
const searchButtonNode = document.getElementById("searchButton");
const movieListNode = document.getElementById("movieList");

const getMovieFromUser = () => {
  const movie = searchInputNode.value.trim()

  if (!movie) {
    alert('Введите название фильма')
    return "";
  }

  return movie;
}

const fetchMovies = (movieName) => {
  const API_URL = `https://www.omdbapi.com/?apikey=ece5a712&s=${movieName}`;
 
  fetch(API_URL)
    .then (response => {
      if (!response.ok) throw new Error("Ошибка сети");
      return response.json();
    })
    .then (data => handleApiResponse(data))
    .catch(error => {
      console.error("Произошла ошибка:", error);
      movieListNode.innerHTML = "<p class='error-message'>Произошла ошибка. Попробуйте снова.</p>";
    });
}

const handleApiResponse = (data) => {
  if (data.Response === "True") {
    renderMovieList(data.Search);
  } else {
    movieListNode.innerHTML = "<p class='error-message'>Фильмы не найдены</p>";
  }
}

const renderMovieList = (movies) => {
  movieListNode.innerHTML = "";

  movies.forEach(movie => {
    const movieItem = document.createElement("li");
    movieItem.classList.add("movie-results__item");

    movieItem.innerHTML = `
      <img class="movie-results__poster" src="${movie.Poster}" alt="постер к фильму ${movie.Title}">
        <div class="movie__description">
          <p class="movie-results__title">${movie.Title}</p>
          <p class="movie-results__year">${movie.Year}</p>
          <p class="movie-results__type">${movie.Type}</p>
        </div>
    `;

    movieListNode.appendChild(movieItem);
  })
}

const searchButtonHandler = () => {
  const movieName = getMovieFromUser();

  if (!movieName) return;

  fetchMovies(movieName);
}

searchButtonNode.addEventListener("click", searchButtonHandler);
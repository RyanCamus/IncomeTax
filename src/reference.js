const tmdbKey = '7f8410f8874cb715eb457e12c991c73e';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');


//General structure of these request is to 1. build out fetch url using api key, request endpoint and request parameters, 2. make the request using async fetch 3. process and return the fetched information
//getGenres fills dropdown menu with names and ids of genres on tmdb, and returns the genre names as an array
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`; //query string
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch)
    // ok is a built-in key in fetch response objects
    if (response.ok) {
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      const genres = jsonResponse.genres
      console.log(genres)
      return genres
    }
  } catch(Error) {
    console.log(Error)
  }
};

//getMovies uses the id of the selected genre to produce a list of 20 movies, and returns those 20 movies as an array
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  //this function is in helpers.js. It returns the id of the genre currently selected in the dropdown menu 
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  //Query syntax: ?key1=value1&key2=value2
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams
  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      //use await because converting from JSON takes time, can do asynchronously
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      const movies = jsonResponse.results
      console.log(movies)
      return movies
    }
  } catch (Error) {
    console.log(Error)
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams
  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (Error) {
    console.log(Error)
  }

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies()
  const randomMovie = getRandomMovie(movies)
  const info = await getMovieInfo(randomMovie)
  displayMovie(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
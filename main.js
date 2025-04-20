// Registrate en la web.

// Generar una API KEY
const API_KEY = "a4c4af9a09255b5e767c029ea7ea839e";
const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/search/movie",
  params: { include_adult: "false", language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGM0YWY5YTA5MjU1YjVlNzY3YzAyOWVhN2VhODM5ZSIsIm5iZiI6MTc0NDgyNDM3OC44MjUsInN1YiI6IjY3ZmZlODNhZGU1ZTRkZWM2MmFlY2U5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BtAbhshQHMgDOix4Zs52nDYxowoM7nIv51Uxv71PjFI",
  },
};

axios
  .request(options)
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err));

// Crear un buscador de peliculas atacando a la API que contenga:

// Input para escribir la película

// Muestre las películas con:

// Imagen

// Título

// Descripción

// Muestra el género de las películas

const API_KEY = "a4c4af9a09255b5e767c029ea7ea839e";
const API_READ_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGM0YWY5YTA5MjU1YjVlNzY3YzAyOWVhN2VhODM5ZSIsIm5iZiI6MTc0NDgyNDM3OC44MjUsInN1YiI6IjY3ZmZlODNhZGU1ZTRkZWM2MmFlY2U5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BtAbhshQHMgDOix4Zs52nDYxowoM7nIv51Uxv71PjFI";
const API_SEARCH_URL = "https://api.themoviedb.org/3/search/movie?query=";
const API_GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list";

let genres = [];
const dataForm = document.getElementById("dataForm");

function getHeaders() {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${API_READ_TOKEN}`,
  };
}
function showError(message) {
  const movieList = document.getElementById("resultContainer");
  movieList.innerHTML = `<p class="text-danger text-center">${message}</p>`;
}

async function searchMovies(query) {
  if (!query.trim()) {
    showError("Por favor, ingresa un término de búsqueda.");
    return;
  }

  try {
    const response = await axios.get(API_SEARCH_URL + query, {
      headers: getHeaders(),
    });
    console.log("Resultados de búsqueda:", response.data.results);
    paintMovies(response.data.results, query);
  } catch (error) {
    console.error("Error al buscar películas:", error);
    showError("Hubo un problema al buscar las películas. Intenta nuevamente.");
  }
}

function paintMovies(movies, query) {
  const movieList = document.getElementById("resultContainer");
  movieList.innerHTML = "";

  const resultText = document.createElement("div");
  resultText.className = "mb-3 text-center w-100";
  resultText.innerHTML = `
    <h5 class="text-primary">
      Tu búsqueda <strong>"${query}"</strong> ha arrojado <strong>${
    movies.length
  }</strong> resultado${movies.length !== 1 ? "s" : ""}.
    </h5>
  `;
  movieList.appendChild(resultText);

  if (movies.length === 0) {
    // Si no hay resultados, mostrar mensaje y salir
    const noResult = document.createElement("p");
    noResult.textContent = "No se encontraron películas con ese término.";
    movieList.appendChild(noResult);
    return;
  }

  const row = document.createElement("div");
  row.className = "row g-4";

  movies.forEach((movie) => {
    const genresText =
      genres
        .filter((gen) => movie.genre_ids.includes(gen.id))
        .map((gen) => gen.name)
        .join(", ") || "No disponible";

    const hasPoster = !!movie.poster_path;
    const posterPath = hasPoster
      ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}`
      : null;

    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card h-100 shadow-sm rounded overflow-hidden">
        ${
          hasPoster
            ? `<img src="${posterPath}" class="card-img-top" alt="Poster de ${movie.title}">`
            : `<div class="d-flex align-items-center justify-content-center bg-secondary text-white" style="height: 450px;">
                <p class="m-0 text-center px-2">Poster no disponible</p>
              </div>`
        }
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text small text-muted">${
            movie.release_date || "Sin fecha de estreno"
          }</p>
          <p class="card-text flex-grow-1">${
            movie.overview || "Sin descripción disponible."
          }</p>
          <p class="card-text mt-2"><small class="text-body-secondary"><strong>Géneros:</strong> ${genresText}</small></p>
        </div>
      </div>
    `;

    row.appendChild(col);
  });

  movieList.appendChild(row);
}

async function getGenre() {
  try {
    const res = await axios.get(API_GENRE_URL, { headers: getHeaders() });
    genres = res.data.genres;
    console.log("Géneros cargados:", genres);
  } catch (error) {
    console.error("Error al obtener géneros:", error);
    showError(
      "No se pudieron cargar los géneros. Intenta nuevamente más tarde."
    );
  }
}

// Event listeners
dataForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchMovies(dataForm[0].value);
  dataForm[0].value = "";
});

// Initialize genres on page load
document.addEventListener("DOMContentLoaded", getGenre);

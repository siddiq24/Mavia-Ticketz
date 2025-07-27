const API_KEY = '7352e397332270de187d1755a24a89d4';
const BASE_URL = 'https://api.themoviedb.org/3';
const container = document.querySelector('.movies-grid');
const searchInput = document.querySelector('.search-input-container > input');
const buttons = document.querySelectorAll('.filter-buttons > li');

const genreMap = new Map(); // ID -> Nama Genre

// Ambil semua genre & movie populer di awal
axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(res => {
        res.data.genres.forEach(g => genreMap.set(g.id, g.name));
        return axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    })
    .then(res => createCards(res.data.results))
    .catch(err => console.error('Error fetching data:', err));

// Buat card movie
function createCards(movies) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        const img = document.createElement('img');
        img.src = (movie.poster_path)
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : `https://www.feed-image-editor.com/sites/default/files/perm/wysiwyg/image_not_available.png`;
        img.alt = movie.title || 'Movie Poster';

        const title = document.createElement('h3');
        title.classList.add('movie-title');
        title.textContent = movie.title || 'No Title Available';

        const genres = document.createElement('div');
        genres.classList.add('movie-categories');

        if (movie.genre_ids?.length) {
            movie.genre_ids.forEach(id => {
                const genreTag = document.createElement('p');
                genreTag.textContent = genreMap.get(id) || 'Unknown Genre';
                genres.appendChild(genreTag);
            });
        }

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(genres);
        container.appendChild(card);
    });
}

// 🔍 Pencarian Judul
searchInput.addEventListener('input', function () {
    const query = this.value.trim();
    if (!query) return;

    axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`)
        .then(res => {
            if (res.data.results.length === 0) {
                alert('Movie not found!');
                return;
            }
            createCards(res.data.results);
        })
        .catch(err => console.error('Error searching movies:', err));
});

// 📁 Filter Genre via Button
buttons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const genreName = button.textContent;
        try {
            const res = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
            const genre = res.data.genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
            const genreId = genre?.id;

            if (!genreId) {
                const fallback = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
                createCards(fallback.data.results);
            } else {
                const filtered = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=1`);
                createCards(filtered.data.results);
            }
        } catch (err) {
            console.error('Error filtering by genre:', err);
        }
    });
});
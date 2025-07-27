const API_KEY = '7352e397332270de187d1755a24a89d4';
const BASE_URL = 'https://api.themoviedb.org/3';

const id = 3;

axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(res => {
        console.log(res.data)
        const imgPoster = document.querySelector('img.backdrop');
        const backdrop = res.data.backdrop_path
        imgPoster.src = `https://image.tmdb.org/t/p/w500${backdrop}`;


        const poster = document.querySelector('.movie-poster')
        const img = res.data.poster_path;
        poster.src = `https://image.tmdb.org/t/p/w500${img}`;


        const titleData = res.data.title
        const title = document.querySelector('.movie-title');
        title.textContent = titleData


        const container = document.querySelector('.movie-genres');
        const genreData = res.data.genres;
        genreData.forEach(genre=>{
            const genreTag = document.createElement('p');
            genreTag.textContent = genre.name
            genreTag.classList.add('genre-tag')
            container.appendChild(genreTag);
        })

        const releaseDateData = res.data.release_date
        const releaseDate = document.querySelector('.movie-meta>div:nth-of-type(1)>p');
        releaseDate.textContent = releaseDateData

        const duration = res.data.runtime;
        const durationContainer = document.querySelector('.movie-meta>div:nth-of-type(3)>p')
        const result = `${Math.floor(duration/60)} hours ${duration%60} minutes`
        durationContainer.textContent = result;

        
        const overview = res.data.overview;
        const overviewContainer = document.querySelector('p.synopsis-text')
        overviewContainer.textContent = overview;
    })
    .catch(err => console.error(err))
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input');
    const favoriteToggle = document.querySelector('.toggle-favorite input');
    const movieList = document.querySelector('.movies-list');
    const movies = document.querySelectorAll('.movie');
    const openListButton = document.getElementById('open-list');
    const movieListModal = document.getElementById('movie-list-modal');
    const closeBtn = document.querySelector('.close-btn');
    const watchlist = document.getElementById('watchlist');

    // Função para filtrar os filmes pelo nome
    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.toLowerCase();
        filterMovies(searchQuery);
    });

    // Função para alternar o status de favorito
    movieList.addEventListener('click', (e) => {
        if (e.target && e.target.matches('.fa-heart')) {
            const movie = e.target.closest('.movie');
            movie.classList.toggle('favorite');  
            e.target.classList.toggle('favorited');  
        }
    });

    favoriteToggle.addEventListener('change', () => {
        filterMovies(searchInput.value.toLowerCase());
    });

    // Função que filtra os filmes com base na pesquisa e nos favoritos
    function filterMovies(query) {
        const showFavoritesOnly = favoriteToggle.checked;
        
        movies.forEach((movie) => {
            const title = movie.querySelector('h2').textContent.toLowerCase();
            const isFavorite = movie.classList.contains('favorite');
            
            // Verifica se o título do filme inclui a pesquisa e se o filtro de favoritos está ativado
            const matchesSearch = title.includes(query);
            const matchesFavorites = !showFavoritesOnly || isFavorite;

            if (matchesSearch && matchesFavorites) {
                movie.style.display = 'block';  
            } else {
                movie.style.display = 'none';  
            }
        });
    }

    function addMovieToWatchlist(movieTitle) {
        const movieExists = Array.from(watchlist.children).some(
            item => item.textContent.replace('✖', '').trim() === movieTitle
        );

        if (movieExists) {
            alert('Este filme já está na lista!');
            return;
        }

        const movieItem = document.createElement('li');
        movieItem.textContent = movieTitle;

        const removeBtn = document.createElement('span');
        removeBtn.textContent = '✖';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', (e) => {
            watchlist.removeChild(movieItem);
            e.stopPropagation(); // Evita que o clique no botão feche a modal
        });

        movieItem.appendChild(removeBtn);
        watchlist.appendChild(movieItem);
    }

    const addButtons = document.querySelectorAll('.add-to-list');
    addButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const movieTitle = button.closest('.movie').querySelector('h2').textContent;
            addMovieToWatchlist(movieTitle);
        });
    });

    openListButton.addEventListener('click', () => {
        movieListModal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        movieListModal.style.display = 'none';
    });

    movieListModal.addEventListener('click', (e) => {
        if (e.target === movieListModal) { 
            movieListModal.style.display = 'none';
        }
    });
});

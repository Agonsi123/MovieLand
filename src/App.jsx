import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg'; 
import MovieCard from './MovieCard';

//2a8f3983

const API_URL = 'http://www.omdbapi.com?apikey=2a8f3983';

// const movie1 = {
//     "Title": "Italian Spiderman",
//     "Year": "2007",
//     "imdbID": "tt2705436",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg"
// }

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search);
    };

    const handleClick = () => {
      searchMovies(searchTerm)
    };

    useEffect(() => {
      searchMovies('spiderman');
    }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLocaleLowerCase())}  
          placeholder='Search for movies' 
          />
          <img src={SearchIcon} 
          alt="search" 
          onClick={handleClick}
          />
      </div>
      
      
      {movies?.length > 0
        ? (
            <div className='container'>
              {movies.map((movie) =>(
                <MovieCard movie={movie}/>
              ))}
            </div>
        ) : (
          <div className='empty'>
            <h2>Movie not found</h2>
          </div>
        )}
      
    </div>
  );
}

export default App

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import EditorList from 'components/EditorList/EditorList';
import Form from 'components/Form/Form';
import { fetchSearchByKeyword } from 'services/TmbdApi';

const Movies = () => {
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoviesText, setNoMoviesText] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchMovies = queryMovie => {
    setSearchParams({ query: queryMovie });
  };

  useEffect(() => {
    setLoading(true);

    const queryMovie = searchParams.get('query');

    if (queryMovie) {
      fetchSearchByKeyword(queryMovie)
        .then(searchResults => {
          setSearchFilms(searchResults);
          setNoMoviesText(searchResults.length === 0);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <main>
      <Form searchMovies={searchMovies} />
      {loading && <Loader />}
      {noMoviesText && (
        <p>There is no movies with this request. Please, try again</p>
      )}
      {searchFilms.length > 0 && <EditorList films={searchFilms} />}
    </main>
    
  );
};

export default Movies;
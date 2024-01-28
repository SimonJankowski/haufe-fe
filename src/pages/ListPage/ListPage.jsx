import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

import { fetchCharacters } from "../../api/characterService";
import Card from "../../components/common/Card/Card";
import "./ListPage.css";

const ListPage = () => {
  const navigate = useNavigate();
  const { page = 1 } = useParams();
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState({});
  const favorites = useSelector((state) => state.auth.favorites);

  useEffect(() => {
    fetchCharacters(page)
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [page]);

  const handleNavigation = (newPage) => {
    navigate(`/list/${newPage}`);
  };

  const handleDetailsClick = (id) => {
    navigate(`/details/${id}`);
  };

  const renderPageNumbers = () => {
    const currentPage = parseInt(page);
    let pages = [];
    for (let i = -2; i <= 2; i++) {
      if (currentPage + i > 0 && currentPage + i <= info.pages) {
        pages.push(currentPage + i);
      }
    }
    return pages.map((pageNum) => (
      <button
        key={pageNum}
        onClick={() => handleNavigation(pageNum)}
        className={pageNum === currentPage ? "active" : ""}
      >
        {pageNum}
      </button>
    ));
  };

  if (!characters.length) {
    if (error) {
      return <div>{error.msg}</div>;
    }
    return <div>Loading characters list...</div>;
  }

  return (
    <main>
      <section className="character-grid">
        {characters.map((character) => (
          <Card key={character.id}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <h2>{character.id}</h2>
            <button
              className="button button-green"
              onClick={() => handleDetailsClick(character.id)}
            >
              Details
            </button>
            {favorites.includes(character.id.toString()) && (
              <FaHeart size={30} className="favorite-icon" />
            )}
          </Card>
        ))}
      </section>
      <div className="pagination">
        {info.prev && (
          <button
            className="button"
            onClick={() => handleNavigation(parseInt(page) - 1)}
          >
            Previous
          </button>
        )}
        {renderPageNumbers()}
        {info.next && (
          <button
            className="button"
            onClick={() => handleNavigation(parseInt(page) + 1)}
          >
            Next
          </button>
        )}
      </div>
    </main>
  );
};

export default ListPage;

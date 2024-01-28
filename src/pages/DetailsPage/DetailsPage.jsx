import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

import Card from "../../components/common/Card/Card";
import { fetchCharacterDetails } from "../../api/characterService";
import { addToFavorites, removeFromFavorites } from "../../api/favoriteService";
import { updateFavorites } from "../../store/slices/authSlice";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const { userId, favorites } = useSelector((state) => state.auth);
  const characterIsFavorite = favorites.includes(id);

  useEffect(() => {
    fetchCharacterDetails(id)
      .then((data) => setCharacter(data))
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  const handleBackToList = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleAddToFavorites = () => {
    addToFavorites(userId, character.id)
      .then(() => {
        dispatch(updateFavorites([...favorites, character.id.toString()]));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(userId, character.id)
      .then(() => {
        dispatch(
          updateFavorites(
            favorites.filter((id) => id !== character.id.toString())
          )
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (!character) {
    if (error) {
      return <div>{error}</div>;
    }
    return <div>Loading character details...</div>;
  }

  return (
    <main>
      <Card classes="character-details-card">
        <img
          src={character.image}
          alt={character.name}
          className="character-details-image"
        />
        <div className="character-details-contet">
          <h3>Status: {character.name}</h3>
          <h3>Status: {character.status}</h3>
          <h3>Species: {character.species}</h3>
          <h3>Gender: {character.gender}</h3>
          <h3>Origin: {character.origin.name}</h3>
          <h3>Location: {character.location.name}</h3>
          <button className="button" onClick={handleBackToList}>
            Go Back
          </button>
          {characterIsFavorite ? (
            <button className="button" onClick={handleRemoveFromFavorites}>
              <FaHeartBroken /> Remove from Favorites
            </button>
          ) : (
            <button className="button" onClick={handleAddToFavorites}>
              <FaHeart /> Add to Favorites
            </button>
          )}
        </div>
      </Card>
    </main>
  );
};

export default DetailsPage;

import React, { useContext } from 'react';
import { CharacterContext } from './context/CharacterContext';
import { HouseMemberContext } from './context/HouseMemberContext';
import Character from './Character';
import Logo from './Logo';

const HouseCharacters = (props) => {
  const [characters] = useContext(CharacterContext);
  const [houses] = useContext(HouseMemberContext);

  if (characters.length === 0 && houses.length === 0) {
    return <p>Character is loading...</p>;
  } else {
    const houseMembers = houses.filter((house) => house.name === props.house)[0]
      .members;
    return (
      <div>
        <Logo />
        <div className='grid-container'>
          {characters
            .filter((character) => houseMembers.includes(character._id))
            .map((character) => {
              return (
                <Character
                  key={character._id}
                  name={character.name}
                  charId={character._id}
                  species={character.species}
                />
              );
            })}
        </div>
      </div>
    );
  }
};
export default HouseCharacters;

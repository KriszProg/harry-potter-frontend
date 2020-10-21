import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalStyles } from './components/GlobalStyle';
import { CharacterProvider } from './components/context/CharacterContext';
import HouseSelection from './components/HouseSelection';
import HouseCharacters from './components/HouseCharacters';
import EmployeeCharacters from './components/EmployeeCharacter';
import { HouseMemberProvider } from './components/context/HouseMemberContext';
import HomePage from './components/HomePage';
import Details from './components/Details';
import MinistryCharacters from './components/MinistryCharacters';
import OtherCharacters from './components/OtherCharacters';
import HogwartsPage from './components/HogwartsPage';

const App = (props) => {
  return (
    <Router>
      <CharacterProvider>
        <div className="App">
          <GlobalStyles />
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path='/hogwarts'>
            <HogwartsPage />
          </Route>
          <Route exact path="/ministry">
            <MinistryCharacters />
          </Route>
          <Route exact path="/other">
            <OtherCharacters />
          </Route>
          <Route exact path="/houses">
            <HouseSelection />
          </Route>
          <Route exact path="/employees">
            <EmployeeCharacters />
          </Route>
          <HouseMemberProvider>
            <Route exact path="/gryffindor">
              <HouseCharacters house="Gryffindor" />
            </Route>
            <Route exact path="/hufflepuff">
              <HouseCharacters house="Hufflepuff" />
            </Route>
            <Route exact path="/ravenclaw">
              <HouseCharacters house="Ravenclaw" />
            </Route>
            <Route exact path="/slytherin">
              <HouseCharacters house="Slytherin" />
            </Route>
          </HouseMemberProvider>
          <Route exact path="/character/:id" component={Details}></Route>
        </div>
      </CharacterProvider>
    </Router>
  );
};

export default App;

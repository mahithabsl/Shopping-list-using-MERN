import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Container } from 'reactstrap';

import TopNavbar from './components/TopNavbar';
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <div className='App'>
      <TopNavbar />
      <Container>
        <ShoppingList />
      </Container>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss'

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart'

interface SearchContextProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext<SearchContextProps>({
  searchValue: '',
  setSearchValue: () => {},
});

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

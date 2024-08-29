import { JSX } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './home/Home';
import Board from './board/Board';

function App(): JSX.Element {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/board' element={<Board />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App

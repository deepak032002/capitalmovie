import './App.css'
import Home from './components/Home'
import MovieDetailPage from './components/MovieDetailPage'
import Popular from './components/Popular'
import Toprated from './components/Toprated'
import Upcoming from './components/Upcoming'
import Search from './components/Search'
import Login from './components/Login'
import Signup from './components/Signup'
import Favourite from './components/Favourite'
import { Route, Routes, Navigate } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="cp_bg_color">
        <Routes>
          <Route path="/" element={<Navigate to="/discover" />}></Route>
          <Route path="/discover" element={<Home />}></Route>
          <Route path="/discover/popular/" element={<Popular />}></Route>
          <Route path="/discover/toprated/" element={<Toprated />}></Route>
          <Route path="/discover/upcoming/" element={<Upcoming />}></Route>
          <Route path="/discover/favourites/" element={<Favourite />}></Route>
          <Route path="/discover/recommendation/" element={<Navigate to="/discover/popular" />}></Route>
          <Route path="/infopage/:id" element={<MovieDetailPage />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="*" element={<h2 className="text-white bg-black text-center">404</h2>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

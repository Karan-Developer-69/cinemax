import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyUser, loadFavorites } from './store/slices/userSlice';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/layout/AdminRoute';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  useEffect(() => {
    if (error && error.includes('banned')) {
      toast.error(error);
      dispatch({ type: 'user/logout' });
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(loadFavorites(user._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (themeMode === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [themeMode]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-primary-bg text-[var(--color-text-primary)] font-bold text-xl">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-shows" element={<TvShows />} />
          <Route path="movie/:id" element={<MovieDetails type="movie" />} />
          <Route path="tv/:id" element={<MovieDetails type="tv" />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--color-secondary-bg)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-color)',
            borderRadius: '16px',
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;
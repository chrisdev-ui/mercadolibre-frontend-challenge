import { Route, Routes } from 'react-router-dom';
// Import pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Other from './pages/Other';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/other' element={<Other />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Router;

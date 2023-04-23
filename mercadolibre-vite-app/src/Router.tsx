import '@/index.scss';
import { Route, Routes } from 'react-router-dom';

// Import root layout
import RootLayout from '@/RootLayout';
// Import pages
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Other from '@pages/Other';

const Router: React.FC = () => {
  return (
    <RootLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/other' element={<Other />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </RootLayout>
  );
};

export default Router;

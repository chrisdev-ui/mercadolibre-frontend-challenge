import '@/index.scss';
import { Route, Routes } from 'react-router-dom';

// Import root layout
import RootLayout from '@/RootLayout';
// Import pages
import Items from '@/pages/Items';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

const Router: React.FC = () => {
  return (
    <RootLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/items' element={<Items />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </RootLayout>
  );
};

export default Router;

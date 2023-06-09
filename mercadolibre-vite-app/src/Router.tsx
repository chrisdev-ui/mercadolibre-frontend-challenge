import '@/index.scss';
import { Route, Routes } from 'react-router-dom';

// Import root layout
import RootLayout from '@/RootLayout';
// Import pages
import Items from '@/pages/Items';
import Error500 from '@pages/500';
import Home from '@pages/Home';
import ItemDetails from '@pages/ItemDetails';
import NotFound from '@pages/NotFound';

const Router: React.FC = () => {
  return (
    <RootLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/items' element={<Items />} />
        <Route path='/items/:id' element={<ItemDetails />} />
        <Route path='/500' element={<Error500 />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </RootLayout>
  );
};

export default Router;

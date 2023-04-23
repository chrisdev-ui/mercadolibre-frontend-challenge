import SearchBox from '@components/SearchBox/SearchBox';
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <SearchBox />
      <main>{children}</main>
      <ToastContainer />
    </>
  );
};

export default RootLayout;

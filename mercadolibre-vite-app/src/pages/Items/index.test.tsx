import { render } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Items from '.';

describe('<Items />', () => {
  test('tests fetch data successfully', async () => {
    const mockData = {
      author: { name: 'John', lastname: 'Doe' },
      categories: ['Electronics', 'Phones'],
      items: [
        {
          id: '123',
          title: 'iPhone 12',
          price: { currency: 'USD', amount: 999, decimals: 0 },
          picture: 'http://example.com/iphone12.jpg',
          condition: 'new',
          free_shipping: true,
        },
      ],
    };
    const axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });
    const { findByText } = render(<Items />, { wrapper: BrowserRouter });
    expect(axiosGetSpy).toHaveBeenCalledWith(`http://localhost:3333/api/items?q=null`);
    const author = await findByText('John Doe');
    const itemTitle = await findByText('iPhone 12');
    const itemPrice = await findByText('$ 999');
    const itemCondition = await findByText('new');
    expect(author).toBeInTheDocument();
    expect(itemTitle).toBeInTheDocument();
    expect(itemPrice).toBeInTheDocument();
    expect(itemCondition).toBeInTheDocument();
  });

  test('tests fetch with no data returned', async () => {
    const axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({});
    const { queryByText } = render(<Items />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for state updates
    });

    const authorName = queryByText('John');
    const authorLastName = queryByText('Doe');
    const itemTitle = queryByText('iPhone 12');
    expect(axiosGetSpy).toHaveBeenCalledWith(`http://localhost:3333/api/items?q=null`);
    expect(authorName).not.toBeInTheDocument();
    expect(authorLastName).not.toBeInTheDocument();
    expect(itemTitle).not.toBeInTheDocument();
  });
});

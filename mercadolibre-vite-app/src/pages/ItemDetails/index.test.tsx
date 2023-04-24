import { render } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import ItemDetails from '.';

describe('<ItemDetails />', () => {
  test('tests fetch data successfully', async () => {
    const mockData = {
      author: { name: 'John', lastname: 'Doe' },
      item: {
        id: '123',
        title: 'iPhone 12',
        price: {
          currency: 'USD',
          amount: 10,
          decimals: 2,
        },
        picture: 'test.jpg',
        condition: 'new',
        free_shipping: true,
        sold_quantity: 5,
        description: 'Test description',
        categories: ['Test', 'Category'],
      },
    };
    const axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });
    const { findByText } = render(<ItemDetails />, { wrapper: BrowserRouter });
    expect(axiosGetSpy).toHaveBeenCalledWith(`http://localhost:3333/api/items/undefined`);
    const author = await findByText('John Doe');
    const itemTitle = await findByText('iPhone 12');
    const itemPrice = await findByText('$ 10');
    const itemDescription = await findByText('Test description');
    expect(author).toBeInTheDocument();
    expect(itemTitle).toBeInTheDocument();
    expect(itemPrice).toBeInTheDocument();
    expect(itemDescription).toBeInTheDocument();
    axiosGetSpy.mockRestore();
  });

  test('test try to fetch data with invalid ID', async () => {
    const axiosGetSpy = vi.spyOn(axios, 'get').mockRejectedValue({ message: 'Invalid item ID' });
    const { findByText } = render(<ItemDetails />, { wrapper: BrowserRouter });
    const errorMessage = await findByText('Invalid item ID');
    expect(errorMessage).toBeInTheDocument();
    axiosGetSpy.mockRestore();
  });

  test('tests fetch with no data returned', async () => {
    const axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({});
    const { queryByText } = render(<ItemDetails />, { wrapper: BrowserRouter });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for state updates
    });

    const authorName = queryByText('John');
    const authorLastName = queryByText('Doe');
    const itemTitle = queryByText('iPhone 12');
    expect(axiosGetSpy).toHaveBeenCalledWith(`http://localhost:3333/api/items/undefined`);
    expect(authorName).not.toBeInTheDocument();
    expect(authorLastName).not.toBeInTheDocument();
    expect(itemTitle).not.toBeInTheDocument();
    axiosGetSpy.mockRestore();
  });
});

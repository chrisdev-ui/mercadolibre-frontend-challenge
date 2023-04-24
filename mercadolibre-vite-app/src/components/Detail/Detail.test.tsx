import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Detail from './Detail';

describe('<Detail />', () => {
  test('test detail component render with valid props', () => {
    const itemInfo = {
      id: '123',
      title: 'Test Item',
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
    };
    render(<Detail {...itemInfo} />, { wrapper: BrowserRouter });
    expect(screen.getByText(itemInfo.title)).toBeInTheDocument();
    expect(screen.getAllByAltText(itemInfo.title)).toBeDefined();
    expect(screen.getByText('Nuevo - 5 vendidos')).toBeInTheDocument();
    expect(screen.getByText(itemInfo.description)).toBeInTheDocument();
    expect(screen.getByText('$ 10')).toBeInTheDocument();
    expect(screen.queryByText('.00')).not.toBeInTheDocument();
    expect(screen.getByText('Comprar')).toBeInTheDocument();
  });
});

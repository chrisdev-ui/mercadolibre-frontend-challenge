import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Item from './Item';

describe('<Item />', () => {
  const mockItem = {
    id: 'MLA123',
    title: 'Test Item',
    price: { currency: 'USD', amount: 1000, decimals: 0 },
    picture: 'https://via.placeholder.com/150',
    condition: 'New',
    free_shipping: true,
  };

  test('renders item details correctly', () => {
    render(
      <BrowserRouter>
        <Item {...mockItem} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('$ 1.000')).toBeInTheDocument();
    expect(screen.getByAltText('Test Item_placeholder')).toBeInTheDocument();
    expect(screen.getByAltText('Test Item')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150',
    );
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByTestId('item-link')).toHaveAttribute('href', '/items/MLA123');
  });
});

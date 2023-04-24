import { render, screen } from '@testing-library/react';
import BreadCrumb from './BreadCrumb';

describe('<BreadCrumb />', () => {
  test('test rendering with valid categories', () => {
    const categories = ['Home', 'Products', 'Electronics'];
    render(<BreadCrumb categories={categories} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  test('test rendering with valid categories and validate elements', () => {
    const categories = ['Home', 'Products', 'Clothing'];
    const { getByTestId, getAllByTestId } = render(<BreadCrumb categories={categories} />);
    const container = getByTestId('breadcrumb_container');
    const spans = getAllByTestId('breadcrumb_span');
    expect(container).toBeInTheDocument();
    expect(spans).toHaveLength(3);
    expect(container).toContainElement(spans[0]);
    expect(container).toContainElement(spans[1]);
    expect(container).toContainElement(spans[2]);
  });

  test('test rendering correctly without categories', () => {
    const categories: string[] = [];
    const { getByTestId, queryAllByTestId } = render(<BreadCrumb categories={categories} />);
    const container = getByTestId('breadcrumb_container');
    const spans = queryAllByTestId('breadcrumb_span');
    expect(container).toBeInTheDocument();
    expect(spans).toHaveLength(0);
  });

  test('renders the separator between categories', () => {
    render(<BreadCrumb categories={['Home', 'Products', 'Clothing']} />);
    expect(screen.getAllByText('&gt;')).toHaveLength(2);
  });
});

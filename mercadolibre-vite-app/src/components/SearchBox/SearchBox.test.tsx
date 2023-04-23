import { searchByQueryUrl } from '@constants/navigation';
import { inputSearchError } from '@constants/searchbox';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SearchBox from './SearchBox';

const mockedUsedNavigate = vi.fn();
const toastErrorMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as any;
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

vi.mock('react-toastify', async () => {
  const actual = (await vi.importActual('react-toastify')) as any;
  return {
    ...actual,
    toast: {
      error: (message: string) => toastErrorMock(message),
    },
  };
});

describe('<SearchBox />', () => {
  test('renders search box correctly', () => {
    const { container } = render(<SearchBox />, { wrapper: BrowserRouter });
    const searchBox = container.querySelector('#searchbox');
    const searchBoxLogo = container.querySelector('#searchbox-logo');
    const searchForm = container.querySelector('form');
    const searchInput = container.querySelector('input[type="text"]');
    const searchButton = container.querySelector('button[type="submit"]');
    expect(searchBox).toBeInTheDocument();
    expect(searchBoxLogo).toBeInTheDocument();
    expect(searchForm).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('handleSubmit function is called when search form is submitted and the search query is properly pass to navigation', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>,
    );
    const searchInput = container.querySelector('input[type="text"]') as HTMLInputElement;
    const searchButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;

    if (searchInput && searchButton) {
      expect(searchInput).toBeTruthy();
      expect(searchButton).toBeTruthy();
      expect(searchInput.textContent).toBe('');
      searchInput.textContent = 'abc';
      expect(searchInput.textContent).toBe('abc');
      fireEvent.change(searchInput, {
        target: {
          value: 'test query',
        },
      });
      expect(searchInput.value).toBe('test query');
      fireEvent.submit(searchButton);
      expect(mockedUsedNavigate).toHaveBeenCalledWith(`${searchByQueryUrl}test query`);
    }
  });

  test('empty search query is handled properly by the handleSubmit function in the search box', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchBox />
        <ToastContainer />
      </MemoryRouter>,
    );

    const searchInput = container.querySelector('input[type="text"]') as HTMLInputElement;
    const searchButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;

    if (searchButton && searchInput) {
      fireEvent.change(searchInput, {
        target: {
          value: '',
        },
      });
      expect(searchInput.value).toBe('');
      fireEvent.submit(searchButton);
      expect(toastErrorMock).toHaveBeenCalledTimes(1);
      expect(toastErrorMock).toHaveBeenCalledWith(inputSearchError);
    }
  });
});

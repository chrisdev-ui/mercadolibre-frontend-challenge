import mercadoLibreLogo from '@/assets/Logo_ML@2x.png.png.png';
import searchLogo from '@/assets/ic_Search@2x.png.png.png';
import useSearchBox from '@/hooks/useSearchBox';
import { inputPlaceholder, mercadoLibreAltLogo, searchIconAltLogo } from '@constants/searchbox';
import { Link } from 'react-router-dom';
import styles from './SearchBox.module.scss';

const SearchBox: React.FC = () => {
  const { searchInput, setSearchInput, handleSubmit } = useSearchBox();
  return (
    <header className={styles.container}>
      <div id='searchbox' className={styles.searchbox}>
        <Link id='searchbox-logo' className={styles.searchbox__logo} to='/'>
          <img src={mercadoLibreLogo} alt={mercadoLibreAltLogo} />
        </Link>
        <form className={styles['searchbox__search-form']} onSubmit={handleSubmit}>
          <input
            type='text'
            className={styles['searchbox__search-form__input']}
            id='searchbox-input'
            name='searchInput'
            placeholder={inputPlaceholder}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            value={searchInput}
          />
          <button type='submit' className={styles['searchbox__search-form__submit']}>
            <img src={searchLogo} alt={searchIconAltLogo} />
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBox;

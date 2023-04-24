import placeholderImg from '@/assets/placeholder.png';
import { itemByIdUrl } from '@constants/navigation';
import { ItemType } from '@pages/Items';
import { formatCurrency } from '@utils/currency';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Item.module.scss';

const Item = ({ id, title, price, picture, condition, free_shipping }: ItemType) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Link className={styles.link_wrapper} to={`${itemByIdUrl}${id}`}>
      <div className={styles.item_container} id={id}>
        <img
          className={styles.thumbnail}
          src={placeholderImg}
          alt={title}
          style={loading ? {} : { display: 'none' }}
        />
        <img
          className={styles.thumbnail}
          src={picture}
          alt={title}
          onLoad={() => setLoading(false)}
          style={loading ? { display: 'none' } : {}}
        />
        <div className={styles.item_details}>
          <h1 className={styles.item_details__price}>
            {formatCurrency(price)}
            {free_shipping && <span className={styles.item_details__free_shipping} />}
            <p className={styles.item_details__condition}>{condition}</p>
          </h1>
          <p className={styles.item_details__title}>{title}</p>
        </div>
      </div>
      <hr />
    </Link>
  );
};

export default Item;

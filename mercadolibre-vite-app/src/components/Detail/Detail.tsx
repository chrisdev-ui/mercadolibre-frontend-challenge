import { ItemInfo } from '@pages/ItemDetails';
import { formatCurrency } from '@utils/currency';

import { DetailConstants } from '@/types/enums';
import styles from './Detail.module.scss';

const Detail: React.FC<ItemInfo> = ({
  title,
  picture,
  condition,
  sold_quantity,
  price,
  description,
}: ItemInfo) => {
  const { conditionNew, sold, newText, buy, descTitle } = DetailConstants;
  const conditionText = () => condition === conditionNew && newText;
  const [integerPart, decimalPart] = formatCurrency(price).split(',');
  return (
    <div className={styles.detail_container}>
      <div className={styles.detail_container__row}>
        <img src={picture} alt={title} />
        <div className={styles.detail_container__row__item_details}>
          <span>
            {conditionText()} {sold_quantity} {sold}
          </span>
          <h3>{title}</h3>
          <h1>
            {integerPart}
            <sup>{decimalPart}</sup>
          </h1>
          <button type='button'>{buy}</button>
        </div>
      </div>
      <div className={styles.detail_container__row}>
        <div className={styles.detail_container__row__description_wrapper}>
          <h2>{descTitle}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;

import BreadCrumb from '@components/BreadCrumb/BreadCrumb';
import Detail from '@components/Detail/Detail';
import { Author } from '@pages/Items';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';

export type ItemInfo = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
  categories: string[];
};

const ItemDetails: React.FC = () => {
  const [author, setAuthor] = useState<Author>({ name: '', lastname: '' });
  const [itemInfo, setItemInfo] = useState<ItemInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Error | null | undefined>();
  const { id: itemId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3333/api/items/${itemId}`);
        const { author, item } = data || {};
        setAuthor(author);
        setItemInfo(item);
      } catch (error: any) {
        console.error(error);
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [itemId]);

  if (errors) {
    return <div>{errors.message}</div>;
  }

  if (isLoading && !itemInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {itemInfo && (
        <>
          <BreadCrumb categories={itemInfo?.categories} />
          <Detail {...itemInfo} />
          <footer className={styles.footer}>{`${author?.name} ${author?.lastname}`}</footer>
        </>
      )}
    </>
  );
};

export default ItemDetails;
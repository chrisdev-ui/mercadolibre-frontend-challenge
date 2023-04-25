import BreadCrumb from '@components/BreadCrumb/BreadCrumb';
import Item from '@components/Item/Item';
import Loader from '@components/Loader/Loader';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './index.module.scss';

export type Author = {
  name: string;
  lastname: string;
};

export type ItemType = {
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
};

const Items: React.FC = () => {
  const [author, setAuthor] = useState<Author>({ name: '', lastname: '' });
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Error | null | undefined>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3333/api/items?q=${searchQuery}`);
        const { author, categories, items } = data || {};
        setAuthor(author);
        setCategories(categories);
        setItems(items);
      } catch (error: any) {
        console.error(error);
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);

  if (errors) {
    navigate('/500');
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BreadCrumb categories={categories} />
      <div className={styles.container}>
        {items?.map(({ id, title, price, picture, condition, free_shipping }) => (
          <Item
            key={id}
            id={id}
            title={title}
            price={price}
            picture={picture}
            condition={condition}
            free_shipping={free_shipping}
          />
        ))}
      </div>
      <footer>{`${author?.name} ${author?.lastname}`}</footer>
    </>
  );
};

export default React.memo(Items);

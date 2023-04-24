import BreadCrumb from '@components/BreadCrumb/BreadCrumb';
import Item from '@components/Item/Item';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './index.module.scss';

type Author = {
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

const Items = () => {
  const [author, setAuthor] = useState<Author>({ name: '', lastname: '' });
  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3333/api/items?q=${searchQuery}`);

        const { author, categories, items } = data || {};
        setAuthor(author);
        setCategories(categories);
        setItems(items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchQuery]);

  return (
    <>
      <BreadCrumb />
      <div className={styles.container}>
        {items.map(({ id, title, price, picture, condition, free_shipping }, index) => (
          <Item
            key={index}
            id={id}
            title={title}
            price={price}
            picture={picture}
            condition={condition}
            free_shipping={free_shipping}
          />
        ))}
      </div>
    </>
  );
};

export default React.memo(Items);

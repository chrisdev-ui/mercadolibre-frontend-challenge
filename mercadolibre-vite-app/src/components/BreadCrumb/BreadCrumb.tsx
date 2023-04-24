import styles from './BreadCrumb.module.scss';

type Props = {
  categories: string[];
};

const BreadCrumb = ({ categories }: Props) => {
  return (
    <div className={styles.breadcrumb_container}>
      {categories?.map((category, index, categoriesArray) => (
        <span
          key={`${category}${index}`}
          className={index === categoriesArray.length - 1 ? styles.bold : ''}
        >
          {category}{' '}
          {categoriesArray.length - 1 !== index && (
            <span dangerouslySetInnerHTML={{ __html: '&gt; ' }} />
          )}
        </span>
      ))}
    </div>
  );
};

export default BreadCrumb;

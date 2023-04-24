import styles from './BreadCrumb.module.scss';

type Props = {
  categories: string[];
};

const BreadCrumb: React.FC<Props> = ({ categories }: Props) => {
  return (
    <div data-testid='breadcrumb_container' className={styles.breadcrumb_container}>
      {categories?.map((category, index, categoriesArray) => (
        <span
          key={`${category}${index}`}
          data-testid='breadcrumb_span'
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

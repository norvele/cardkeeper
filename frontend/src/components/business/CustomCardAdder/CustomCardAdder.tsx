import AddIcon from '@/assets/icons/add_circle_outline.svg?react';
import styles from '@/components/business/CustomCardAdder/customCardAdder.module.scss';

const CustomCardAdder = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.sheet} ${styles.whiteSheet}`}>
        <div className={styles.icon}>
          <AddIcon />
        </div>
        <p className={styles.text}>Add Cards</p>
      </div>
      <div className={`${styles.sheet} ${styles.blueSheet}`} />
      <div className={`${styles.sheet} ${styles.orangeSheet}`} />
    </div>
  );
};

export default CustomCardAdder;

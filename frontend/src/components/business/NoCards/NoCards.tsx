import BlueClip from '@/assets/images/blue_clip.svg?react';
import GreenClip from '@/assets/images/green_clip.svg?react';
import PinkClip from '@/assets/images/pink_clip.svg?react';
import Button from '@/components/UI/buttons/button/Button';
import styles from '@/components/business/NoCards/noCards.module.scss';

const NoCards = () => {
  return (
    <main className={styles.content}>
      <h3 className={styles.title}>No cards yet</h3>
      <Button variant="primary" size="regular">
        Add card
      </Button>
      <p className={styles.p}>OR</p>
      <Button variant="default" size="regular">
        Import from CSV
      </Button>
      <div className={styles.clips}>
        <GreenClip width={25} height={32} id={styles.greenclip} />
        <BlueClip width={30} height={32} id={styles.blueclip} />
        <PinkClip width={30} height={32} id={styles.pinkclip} />
      </div>
    </main>
  );
};

export default NoCards;

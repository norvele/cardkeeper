import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AllDeckSettings from '@/components/business/AllDeckSettings/AllDeckSettings';
import FocusedDeckSettings from '@/components/business/FocusedDeckSettings/FocusedDeckSettings';

interface ISettingsPagesMap {
  [key: string]: ReactNode;
}

const AllDeckSettingsPage = () => {
  const [shadowIsVisible, setShadowIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShadowIsVisible(true);
      } else {
        setShadowIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { id: deckId } = useParams() as { id: string };

  const settingsPagesMap: ISettingsPagesMap = {
    '1': <AllDeckSettings deckId={deckId} shadowIsVisible={shadowIsVisible} />,
    '2': (
      <FocusedDeckSettings deckId={deckId} shadowIsVisible={shadowIsVisible} />
    ),
  };

  return settingsPagesMap[deckId];
};

export default AllDeckSettingsPage;

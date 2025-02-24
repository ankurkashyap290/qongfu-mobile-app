import React, {useState, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import theme from '../../styles/theme.style';

const GlobalOverlayLoading = ({loading, textContent, overlayColor}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(loading);
  }, [loading]);

  return (
    <Spinner
      visible={visible}
      textContent={textContent}
      overlayColor={overlayColor ? overlayColor : 'rgba(0, 0, 0, 0.25)'}
      textStyle={{color: theme.PRIMARY_COLOR}}
    />
  );
};
export default GlobalOverlayLoading;

import React, {useState} from 'react';
import {View} from 'react-native';
import {Chip} from 'react-native-paper';
import styles from '../../styles/myProfile.style';

const LifestyleAndQongfus = (props) => {
  const [moreQongfus, setMoreQongfus] = useState(false);
  const {lifestyles, selectedLifestyles, selectedQongfus} = props;

  const lifestyleBackgroundColor = (item) => {
    let lifestyleColor = '#eee';
    const tempLifestyle = lifestyles.find(
      (lifestyle) => lifestyle.id === item.lifestyle_id,
    );
    if (tempLifestyle) {
      lifestyleColor = `#${tempLifestyle.lifestyle_color}`;
    }
    return lifestyleColor;
  };
  const handleMoreQogfus = () => {
    setMoreQongfus(true);
  };
  return (
    <View>
      <View style={styles.lifestyleAndQongfuContain}>
        {selectedLifestyles.map((lifestyle) => {
          return (
            <Chip
              style={[
                {
                  backgroundColor: `#${lifestyle.lifestyle_color}`,
                },
                styles.lifestyleChip,
              ]}
              textStyle={styles.lifestyleChipText}>
              {lifestyle.lifestyle}
            </Chip>
          );
        })}
      </View>
      <View
        style={
          moreQongfus
            ? styles.QongfusContainerOverflow
            : styles.QongfusContainer
        }>
        {selectedQongfus.map((qongfu) => {
          return (
            <Chip
              style={[
                {
                  backgroundColor: qongfu.qongfu_color
                    ? `#${qongfu.qongfu_color}`
                    : lifestyleBackgroundColor(qongfu),
                },
                styles.qongfuChip,
              ]}
              textStyle={styles.qongfuChipText}>
              {qongfu.qongfu}
            </Chip>
          );
        })}
      </View>
      <View style={styles.moreButton}>
        {selectedQongfus.length > 6 && !moreQongfus ? (
          <Chip
            style={[
              {
                backgroundColor: '#ccc',
              },
              styles.qongfuChip,
            ]}
            textStyle={styles.qongfuChipText}
            onPress={() => handleMoreQogfus()}>
            more..
          </Chip>
        ) : null}
      </View>
    </View>
  );
};

export default LifestyleAndQongfus;

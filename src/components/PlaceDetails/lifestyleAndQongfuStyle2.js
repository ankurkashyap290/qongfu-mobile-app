import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {View, Text} from 'react-native';
import {Chip} from 'react-native-paper';
import styles from '../../styles/placeDetails.style';
import TextReadMore from '../custom/TextReadMore';

const LifeStylesAndQongfus = ({lifestyles, qongfuMax, qongfus}) => {
  const [counter, setCounter] = useState(qongfuMax);
  const [selectedLifestyles, setSelectedLifestyles] = useState([]);
  const [selectedQongfus, setSelectedQongfus] = useState([]);

  useEffect(() => {
    if (lifestyles.length || qongfus.length) {
      loadLifestylesAndQongfus();
    }
  }, [lifestyles, qongfus]);

  useEffect(() => {
    loadLifestylesAndQongfus();
  }, [counter]);

  const loadLifestylesAndQongfus = () => {
    const tempQongfus = [];
    if (qongfus) {
      const length = qongfus.length > counter ? counter : qongfus.length;
      for (let i = 0; i < length; i++) {
        tempQongfus.push(qongfus[i]);
      }
      setSelectedQongfus([...tempQongfus]);
      setSelectedLifestyles(
        _.cloneDeep(lifestyles).filter((lifestyle) =>
          tempQongfus
            .map((qongfu) => qongfu.lifestyle_id)
            .includes(lifestyle.id),
        ),
      );
    }
    setSelectedLifestyles(lifestyles);
  };

  const handleMoreQogfus = (mode) => {
    if (mode === 'less') {
      setCounter(qongfuMax);
    } else {
      setCounter(qongfus.length);
    }
  };

  // const lifestyleBackgroundColor = item => {
  //   let lifestyleColor = '#eee';
  //   const tempLifestyle = lifestyles.find(
  //     lifestyle => lifestyle.id === item.lifestyle_id,
  //   );
  //   if (tempLifestyle) {
  //     lifestyleColor = `#${tempLifestyle.lifestyle_color}`;
  //   }
  //   return lifestyleColor;
  // };

  const renderLifestyles = () => {
    return (
      <View style={styles.lifestyleContainerStyle2}>
        {selectedLifestyles.map((item, index) => {
          return (
            <Text
              style={[
                styles.lifestyleStyle2,
                {
                  color: `#${item.lifestyle_color}`,
                },
              ]}>
              #{item.lifestyle}
            </Text>
          );
        })}
      </View>
    );
  };

  const renderQongfus = () => {
    const qongfuText = selectedQongfus
      .map((item) => {
        return `#${item.qongfu}`;
      })
      .join('     ');
    return (
      <View>
        <View style={styles.lifestyleContainerStyle2}>
          <TextReadMore
            textStyle={{
              ...styles.lifestyleStyle2,
              color: '#858585',
            }}
            numberOfLines={2}
            moreButtonStyle={styles.moreButtonStyle2}
            contentLength={qongfuText.length}>
            <Text>{qongfuText}</Text>
          </TextReadMore>
        </View>
        {selectedLifestyles.length === 0 && selectedQongfus.length === 0 ? (
          <Text style={{color: '#919191'}}>Not Found!</Text>
        ) : null}
      </View>
    );
  };

  return (
    <React.Fragment>
      {renderLifestyles()}
      {renderQongfus()}
    </React.Fragment>
  );
};

export default LifeStylesAndQongfus;

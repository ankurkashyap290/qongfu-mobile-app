import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {View, Text} from 'react-native';
import {Chip} from 'react-native-paper';
import styles from '../../styles/lifestylesAndQongfu.style';

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
        _.cloneDeep(lifestyles).filter(lifestyle =>
          tempQongfus.map(qongfu => qongfu.lifestyle_id).includes(lifestyle.id),
        ),
      );
    }
    setSelectedLifestyles(lifestyles);
  };

  const handleMoreQogfus = mode => {
    if (mode === 'less') {
      setCounter(qongfuMax);
    } else {
      setCounter(qongfus.length);
    }
  };

  const lifestyleBackgroundColor = item => {
    let lifestyleColor = '#eee';
    const tempLifestyle = lifestyles.find(
      lifestyle => lifestyle.id === item.lifestyle_id,
    );
    if (tempLifestyle) {
      lifestyleColor = `#${tempLifestyle.lifestyle_color}`;
    }
    return lifestyleColor;
  };

  const renderLifestyles = () => {
    return (
      <View style={styles.lifestyleContainer}>
        {selectedLifestyles.map((item, index) => {
          return (
            <Chip
              textStyle={styles.lifestyleChipText}
              style={[
                {
                  backgroundColor: `#${item.lifestyle_color}`,
                },
                styles.lifestyleChip,
              ]}
              key={`${item.lifestyle}-${index}`}>
              {item.lifestyle}
            </Chip>
          );
        })}
      </View>
    );
  };

  const renderQongfus = () => {
    return (
      <View>
        <View style={styles.lifestyleContainer}>
          {selectedQongfus.map((item, index) => {
            if (index < counter) {
              return (
                <Chip
                  key={`${item.qongfu}-${index}`}
                  textStyle={styles.qongfuChipText}
                  style={[
                    {
                      backgroundColor: item.qongfu_color
                        ? `#${item.qongfu_color}`
                        : lifestyleBackgroundColor(item),
                    },
                    styles.qongfuChip,
                  ]}>
                  {item.qongfu}
                </Chip>
              );
            }
          })}
        </View>
        {selectedLifestyles.length === 0 && selectedQongfus.length === 0 ? (
          <Text style={{color: '#919191'}}>Not Found!</Text>
        ) : null}
        <View style={styles.moreButton}>
          {qongfus.length > qongfuMax ? (
            <Chip
              style={[
                {
                  backgroundColor: '#ccc',
                },
                styles.qongfuChip,
              ]}
              textStyle={styles.qongfuChipText}
              onPress={() =>
                handleMoreQogfus(counter === qongfus.length ? 'less' : 'more')
              }>
              {qongfus.length === counter ? 'less..' : 'more..'}
            </Chip>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <React.Fragment>
      {/* <Text variant="h5" component="h5">
        Lifestyles & Qoungfu
      </Text> */}
      {renderLifestyles()}
      {renderQongfus()}
    </React.Fragment>
  );
};

export default LifeStylesAndQongfus;

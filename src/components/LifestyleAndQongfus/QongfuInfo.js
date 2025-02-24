import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Chip} from 'react-native-paper';
import styles from '../../styles/lifestylesAndQongfu.style';
import {fetchAllLifestyles} from '../../../redux/app/actions';

const QongfuInfo = props => {
  const {lifestyles} = props;
  useEffect(() => {
    if (lifestyles && lifestyles.length === 0) {
      fetchAllLifestyles();
    }
  }, []);
  return (
    <View style={{paddingBottom: 40}}>
      <View style={styles.qongfuHelpContainer}>
        <Text style={styles.qongfuHelpText}>What’s a Qongfu?</Text>

        <Text style={styles.qongfuHelpSubtext}>
          A Qongfu is any skill practiced over a period of time.
        </Text>
      </View>
      <View style={styles.qongfuHelpContainer}>
        <Text style={styles.qongfuHelpText}>What qualifies for Qongfu?</Text>

        <Text style={styles.qongfuHelpSubtext}>
          A Qongfu must fit into one of the following categories:
        </Text>
        <View
          style={[styles.lifestyleInfoContainer, {justifyContent: 'center'}]}>
          {lifestyles.map(lifestyle => {
            return (
              <Chip
                style={[
                  {
                    backgroundColor: `#${lifestyle.lifestyle_color}`,
                  },
                  styles.lifestyleChip,
                ]}
                textStyle={[styles.lifestyleChipText, {color: '#000'}]}>
                {lifestyle.lifestyle}
              </Chip>
            );
          })}
        </View>
        <Text style={styles.qongfuHelpSubtext}>
          If any of these categories encompasses your practice then by all means
          share it with us and we will add it to our database.
        </Text>
      </View>
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    lifestyles: state.app.lifestyles,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators({fetchAllLifestyles}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QongfuInfo);

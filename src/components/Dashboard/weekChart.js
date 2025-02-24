import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Surface, Card} from 'react-native-paper';
import moment from 'moment';
import styles from '../../styles/dashboard.style';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryContainer,
  VictoryLine,
} from 'victory-native';
import Svg from 'react-native-svg';

const screenWidth = Math.round(Dimensions.get('window').width);
const data = [
  {hour: 'Sun', biometricValue: 300},
  {hour: 'Mon', biometricValue: 400},
  {hour: 'Tue', biometricValue: 100},
  {hour: 'Wed', biometricValue: 40},
  {hour: 'Thu', biometricValue: 40},
  {hour: 'Fri', biometricValue: 120},
  {hour: 'Sat', biometricValue: 230},
];

const WeekChart = ({configData, userBiometrics}) => {
  const [dateCardMode, setDateCardMode] = useState('Average');

  const renderTodayDataCard = () => {
    return (
      <Card style={styles.totalCard}>
        <Card.Content>
          <Text style={styles.totalText}>{dateCardMode}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 4,
            }}>
            <Text style={styles.totalValue}>3243</Text>
            <Text style={styles.totalUnit}> {configData.unit}</Text>
          </View>
          <Text style={styles.totalDate}>
            {moment()
              .startOf('week')
              .format('DD MMM')}{' '}
            -{' '}
            {moment()
              .endOf('week')
              .format('DD MMM YYYY')}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  const renderChart = () => {
    return configData.name === 'Body Fat' ||
      configData.name === 'Weight' ||
      configData.name === 'BMI' ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        {/* <Svg width={screenWidth} height={300}> */}
        <VictoryChart
          width={screenWidth}
          theme={VictoryTheme.material}
          domainPadding={5}
          containerComponent={<VictoryContainer disableContainerEvents />}
          // standalone={false}
          style={{
            background: {fill: '#fff'},
          }}>
          <VictoryLine
            data={data}
            // labelComponent={<VictoryTooltip />}
            x="hour"
            y="biometricValue"
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressOut: () => {
                    console.log('****************');
                    return {
                      mutation: () => null,
                    };
                  },
                  onPressIn: () => {
                    console.log('****************');
                    return [
                      {
                        target: 'data',
                        mutation: props => {
                          <VictoryLabel
                            textAnchor="middle"
                            style={{fontSize: 20, fill: 'red'}}
                          />;
                          this.changeData(props.index);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            style={{data: {stroke: '#E2BC65'}}}
            // barRatio={0.3}
            // barWidth={10}
            labelComponent={
              <VictoryLabel
                dy={-20}
                backgroundStyle={{fill: 'tomato', opacity: 0.6}}
                backgroundPadding={{bottom: 5, top: 5}}
              />
            }
            // standalone={false}
          />
        </VictoryChart>
        {/* </Svg> */}
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        {/* <Svg width={screenWidth} height={300}> */}
        <VictoryChart
          width={screenWidth}
          theme={VictoryTheme.material}
          domainPadding={10}
          style={{
            background: {fill: '#fff'},
          }}>
          <VictoryBar
            data={data}
            // labelComponent={<VictoryTooltip />}
            x="hour"
            y="biometricValue"
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressOut: () => {
                    console.log('****************');
                    return {
                      mutation: () => null,
                    };
                  },
                  onPressIn: () => {
                    console.log('****************');
                    return [
                      {
                        target: 'data',
                        mutation: props => {
                          <VictoryLabel
                            textAnchor="middle"
                            style={{fontSize: 20, fill: 'red'}}
                          />;
                          this.changeData(props.index);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            style={{data: {fill: '#E2BC65'}}}
            // barRatio={0.3}
            // barWidth={10}
            // labelComponent={
            //   <VictoryLabel
            //     dy={-20}
            //     backgroundStyle={{fill: 'tomato', opacity: 0.6}}
            //     backgroundPadding={{bottom: 5, top: 5}}
            //   />
            // }
            // standalone={false}
          />
        </VictoryChart>
      </View>
    );
  };

  return (
    <View>
      <View style={{marginTop: 20}}>{renderTodayDataCard()}</View>
      <View style={{marginTop: 20}}>{renderChart()}</View>
    </View>
  );
};

export default WeekChart;

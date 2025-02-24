import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Surface, Card} from 'react-native-paper';
import moment from 'moment';
import styles from '../../styles/dashboard.style';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryContainer,
  VictoryLine,
  VictoryAxis,
} from 'victory-native';
import Svg from 'react-native-svg';

const screenWidth = Math.round(Dimensions.get('window').width);
const data = [
  {hour: '1', biometricValue: 300},
  {hour: '2', biometricValue: 400},
  {hour: '3', biometricValue: 100},
  {hour: '4', biometricValue: 40},
  {hour: '5', biometricValue: 40},
  {hour: '6', biometricValue: 300},
  {hour: '7', biometricValue: 400},
  {hour: '8', biometricValue: 100},
  {hour: '9', biometricValue: 40},
  {hour: '10', biometricValue: 40},
  {hour: '11', biometricValue: 120},
  {hour: '12', biometricValue: 230},
  {hour: '13', biometricValue: 440},
  {hour: '14', biometricValue: 500},
  {hour: '15', biometricValue: 430},
  {hour: '16', biometricValue: 280},
  {hour: '17', biometricValue: 390},
  {hour: '18', biometricValue: 20},
  {hour: '19', biometricValue: 0},
  {hour: '20', biometricValue: 10},
  {hour: '21', biometricValue: 400},
  {hour: '22', biometricValue: 430},
  {hour: '23', biometricValue: 300},
  {hour: '24', biometricValue: 100},
  {hour: '25', biometricValue: 100},
  {hour: '26', biometricValue: 100},
  {hour: '27', biometricValue: 100},
  {hour: '28', biometricValue: 100},
  {hour: '29', biometricValue: 100},
  {hour: '30', biometricValue: 100},
  {hour: '31', biometricValue: 100},
];

const MonthChart = ({configData, userBiometrics}) => {
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
            {' '}
            {moment()
              .startOf('month')
              .format('DD MMM')}{' '}
            -{' '}
            {moment()
              .endOf('month')
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
          domainPadding={5}
          singleQuadrantDomainPadding={{x: false}}
          style={{
            background: {fill: '#fff'},
          }}>
          {/* <VictoryAxis
            crossAxis
            width={400}
            height={400}
            domain={[-10, 10]}
            theme={VictoryTheme.material}
            offsetY={200}
            standalone={false}
          />
          <VictoryAxis
            style={{
              tickLabels: {fontSize: 12},
              axis: {stroke: 'none'},
            }}
            offsetX={200}
            standalone={false}
            domain={[-10, 10]}
          /> */}
          <VictoryBar
            data={data}
            labelComponent={<VictoryLabel dy={10} />}
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
            labelComponent={
              <VictoryLabel
                dy={-20}
                backgroundStyle={{fill: 'tomato', opacity: 0.6}}
                backgroundPadding={{bottom: 5, top: 5}}
              />
            }
            standalone={false}
          />
        </VictoryChart>
        {/* </Svg> */}
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

export default MonthChart;

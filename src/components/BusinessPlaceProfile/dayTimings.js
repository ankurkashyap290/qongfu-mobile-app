import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {
  Card,
  Button,
  Switch,
  TextInput,
  Checkbox,
  HelperText,
  List,
  Portal,
  Dialog,
  Surface,
} from 'react-native-paper';
import {isInputTimeValid} from '../../../utils';
import styles from '../../styles/businessPlaceProfile.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../custom/textField';
import Menu from 'react-native-material-menu';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';

class DayTimings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meridiem: {},
      openTime: false,
    };
  }

  handleClose = (value) => {
    const {onCloseDay, day} = this.props;
    onCloseDay(day, value);
  };
  handleInputChange = (type, timeIndex, value, meridiem) => {
    const {onTimeInputChange, day} = this.props;
    onTimeInputChange(day, type, timeIndex, value, meridiem);
  };
  toggleMeridiemMenu = (type, index) => {
    const {meridiem} = this.state;
    const newMeridiem = {...meridiem};
    newMeridiem[index] = newMeridiem[index] || {};
    newMeridiem[index][type] = !newMeridiem[index][type];
    this.setState({
      meridiem: newMeridiem,
    });
  };

  onClickMeridiem = (type, timeIndex, value) => {
    const {onTimeMeridiemChange, day} = this.props;
    onTimeMeridiemChange(day, type, timeIndex, value);
  };

  renderMeridiemList = () => {
    return (
      <Menu>
        <List.Item
          title="Am"
          onPress={() => this.onClickMeridiem('startMeridiem', index, 'AM')}
        />

        <List.Item
          title="Pm"
          onPress={() => this.onClickMeridiem('startMeridiem', index, 'PM')}
        />
      </Menu>
    );
  };

  renderTimeFieldLabel = (key, index, time, isClosed) => {
    const timeValue = time[key];
    const timeMeridiem = time[`${key}Meridiem`];
    return (
      <TouchableOpacity
        disabled={isClosed}
        onPress={() => {
          const openTimeSelected = moment().format('DD-MM-YYYY');

          this.setState({
            openTime: true,
            timeOpenKey: key,
            timeOpenIndex: index,
            openTimeSelected: moment(
              `${openTimeSelected} ${timeValue}${timeMeridiem}`,
              'DD-MM-YYYY hh:mm:A',
            ).toDate(),
          });
        }}>
        <Surface
          style={{
            borderRadius: 20,
            padding: 6,
            elevation: 0,
            borderWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text style={{color: isClosed ? '#ccc' : '#000'}}>
            {timeValue}
            {timeMeridiem}
          </Text>
        </Surface>
      </TouchableOpacity>
    );
  };
  render() {
    const {
      type,
      day,
      timings,
      isClosed,
      closedClass,
      onAddAnother,
      onDeleteDayTime,
    } = this.props;

    const {meridiem} = this.state;
    // const menu = null;
    // setMenuRef = ref => {
    //   menu = ref;
    // };
    return (
      <React.Fragment>
        <View>
          {timings.map((time, index) => {
            const isStartHourMenuOpen =
              meridiem[index] && meridiem[index].startOpen ? true : false;
            const isCloseHourMenuOpen =
              meridiem[index] && meridiem[index].closeOpen ? true : false;

            return (
              <View
                key={`day_row_${index}`}
                style={{
                  flexDirection: 'row',
                  marginBottom: 5,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{margin: 5}}>
                    {this.renderTimeFieldLabel('start', index, time, isClosed)}
                  </View>
                  <View style={{margin: 5}}>
                    {this.renderTimeFieldLabel('close', index, time, isClosed)}
                  </View>
                </View>
                <View>
                  {index === 0 ? (
                    type === 'regular' && (
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 45,
                        }}>
                        <Checkbox.Android
                          status={isClosed ? 'checked' : 'unchecked'}
                          color="#54B948"
                          uncheckedColor="#707070"
                          onPress={() => this.handleClose(!isClosed)}
                        />
                        <Text
                          style={
                            isClosed ? styles.closedRedText : styles.closedText
                          }>
                          Closed
                        </Text>
                      </View>
                    )
                  ) : (
                    <View
                      style={{
                        flexDirection: 'column',
                        flex: 1,
                        width: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="delete"
                        size={22}
                        color="#b5b5b5"
                        onPress={() =>
                          !isClosed && onDeleteDayTime(day, index)
                        }></Icon>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
          {timings.length >= 2 ? null : (
            <View>
              <Button
                mode="text"
                disabled={isClosed}
                labelStyle={
                  isClosed
                    ? styles.addBusinessHoursText
                    : styles.addScheduleButtonLabel
                }
                onPress={() => onAddAnother(day)}>
                + Add another schedule
              </Button>
            </View>
          )}
        </View>
        <Portal>
          <Dialog
            visible={this.state.openTime}
            onDismiss={() => {
              this.setState({
                openTime: false,
                timeOpenKey: '',
                timeOpenIndex: -1,
              });
            }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.openTimeSelected}
              mode={'time'}
              is24Hour={false}
              display="default"
              onChange={(event, selectedDate) => {
                const pickedDate = moment(selectedDate);
                const newTime = pickedDate.format('hh:mm');
                const newMeridiem = pickedDate.format('A');
                const isIOS = Platform.OS === 'ios';
                const newState = {};
                if (event.type === 'set' || isIOS) {
                  const {onTimeInputChange, day} = this.props;
                  onTimeInputChange(
                    day,
                    this.state.timeOpenKey,
                    this.state.timeOpenIndex,
                    newTime,
                    newMeridiem,
                  );
                  newState.openTimeSelected = pickedDate.toDate();
                }
                if (!isIOS) {
                  newState.openTime = false;
                }

                if (Object.keys(newState).length) {
                  this.setState({...newState});
                }
              }}
            />
            {Platform.OS === 'ios' ? (
              <Button
                onPress={() => {
                  this.setState({openTime: false});
                }}>
                Done
              </Button>
            ) : null}
          </Dialog>
        </Portal>
      </React.Fragment>
    );
  }
}

export default DayTimings;

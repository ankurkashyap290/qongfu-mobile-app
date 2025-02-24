import React from 'react';
import _ from 'lodash';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Button, Switch, Checkbox, Divider} from 'react-native-paper';
import moment from 'moment';
import {Week_Day} from '../../../config';
import styles from '../../styles/businessPlaceProfile.style';
import theme from '../../styles/theme.style';
import DayTimings from './dayTimings';
import {
  formatTimeToShow,
  formatTimeToSave,
  getTimeMeridiem,
} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import LabelField from '../custom/LabelField';
import CustomAlert from '../custom/customAlert';
import TextField from '../custom/textField';

class BusinessTimings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: props.mode && props.mode === 'edit' ? true : false,
      editMode: '',
      timings: this.formatTimingsToShow(_.cloneDeep(props.timings)),
      schedule: this.loadSchedule(props.schedule),
      scheduleLabelError: false,
      scheduleRangeError: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timings.length !== this.props.timings.length) {
      this.setState({
        timings: this.formatTimingsToShow(_.cloneDeep(nextProps.timings)),
        schedule: this.loadSchedule(nextProps.schedule),
      });
    }
  }

  //  startDayDialog = useRef();
  //  endDayDialog= useRef();

  handleStartDayModalOpen = () => {
    const {schedule} = this.state;
    this.startDayDialog.open({
      date: schedule.startDate.toDate(),
    });
  };

  handleEndDayModalOpen = () => {
    const {schedule} = this.state;
    this.endDayDialog.open({
      date: schedule.endDate.toDate(),
    });
  };

  onStartDatePicked = (date) => {
    this.handleScheduleFieldChange('startDate', moment(date));
  };

  onEndDatePicked = (date) => {
    this.handleScheduleFieldChange('endDate', moment(date));
  };

  loadSchedule = (schedule) => {
    const {type} = this.props;
    return type === 'schedule'
      ? {
          ...schedule,
          startDate: moment(schedule.startDate),
          endDate: moment(schedule.endDate),
        }
      : null;
  };

  isScheduleClosed = () => {
    const {type} = this.props;
    return (
      type === 'regular' || (type === 'schedule' && !this.state.schedule.closed)
    );
  };

  formatTimingsToShow = (timings) => {
    return timings.map((day) => {
      day.time = day.time.map((time) => {
        time.startMeridiem = getTimeMeridiem(time.start);
        time.closeMeridiem = getTimeMeridiem(time.close);
        time.start = formatTimeToShow(time.start);
        time.close = formatTimeToShow(time.close);
        return time;
      });
      return day;
    });
  };

  formatTimingsToSave = (timings) => {
    return timings.map((day) => {
      day.time = day.time.map((time) => {
        if (day.isClosed) {
          time.start = '00:00';
          time.close = '00:00';
        } else {
          time.start = formatTimeToSave(`${time.start}${time.startMeridiem}`);
          time.close = formatTimeToSave(`${time.close}${time.closeMeridiem}`);
        }
        delete time.startMeridiem;
        delete time.closeMeridiem;
        return time;
      });

      return day;
    });
  };

  setEditMode = (mode) => {
    this.handleEditIcon(mode);
  };

  stopEdit = () => {
    this.setState({
      isEdit: false,
      editMode: '',
    });
  };

  handleEditIcon = (mode) => {
    const {onEditTime, mode: runMode} = this.props;
    if (runMode !== 'read') {
      this.setState({isEdit: true, editMode: mode});
    }
    onEditTime(true, this);
  };
  handleCloseIcon = () => {
    const {onEditTime, timings, schedule, mode: runMode} = this.props;
    // TODO: if required to add condition to compare old timing and updated timing here
    // const diff = _.difference(this.state.timings, timings);
    // if (diff.length) {
    //   console.log("Differences Found", diff);
    // }
    if (runMode !== 'read') {
      this.setState({
        isEdit: false,
        editMode: '',
        timings: this.formatTimingsToShow(_.cloneDeep(timings)),
        schedule: this.loadSchedule(schedule),
      });
    }
    onEditTime(false);
  };
  handleCloseDay = (day, isClosed) => {
    const {timings} = this.state;
    const dayIndex = timings.findIndex((time) => time.day === day);
    const newTimings = _.cloneDeep(timings);
    newTimings[dayIndex].isClosed = isClosed;
    this.setState({timings: newTimings});
  };
  handleAddAnotherTimeForDay = (day) => {
    const {timings} = this.state;
    const dayIndex = timings.findIndex((time) => time.day === day);
    const newTimings = _.cloneDeep(timings);
    if (newTimings[dayIndex].time.length < 3) {
      newTimings[dayIndex].time.push({
        start: '08:00',
        startMeridiem: 'AM',
        close: '04:00',
        closeMeridiem: 'PM',
      });
      this.setState({timings: newTimings});
    }
  };
  handleDeleteAnotherTimeForDay = (day, timeIndex) => {
    const {timings} = this.state;
    const dayIndex = timings.findIndex((time) => time.day === day);
    const newTimings = _.cloneDeep(timings);
    newTimings[dayIndex].time.splice(timeIndex, 1);
    this.setState({timings: newTimings});
  };
  handleTimeInputChange = (day, type, timeIndex, value, meridiem) => {
    const {timings} = this.state;
    const dayIndex = timings.findIndex((time) => time.day === day);
    const newTimings = _.cloneDeep(timings);
    newTimings[dayIndex].time[timeIndex][type] = value;
    newTimings[dayIndex].time[timeIndex][`${type}Meridiem`] = meridiem;
    this.setState({timings: newTimings});
  };

  isValidTimings = () => {
    const {type} = this.props;
    const {schedule} = this.state;
    if (type === 'schedule') {
      let isScheduleLabelValid = true;
      // check for schedule label
      if (!schedule.label.length) {
        isScheduleLabelValid = false;
      }
      let isScheduleRangeValid = true;
      // check for date range
      if (schedule.endDate.diff(schedule.startDate, 'days') < 0) {
        isScheduleRangeValid = false;
      }
      this.setState({
        scheduleLabelError: !isScheduleLabelValid,
        scheduleRangeError: !isScheduleRangeValid,
      });
      return isScheduleLabelValid && isScheduleRangeValid;
    }
    // as timing will be auto selected so no error
    return true;
  };

  handleSaveTimings = () => {
    const {onUpdateTime, type} = this.props;
    if (this.isValidTimings()) {
      onUpdateTime(
        this.formatTimingsToSave(_.cloneDeep(this.state.timings)),
        type === 'schedule' ? this.state.schedule : undefined,
      );
    }
  };

  handleTimeMeridiemChange = (day, type, timeIndex, value) => {
    const {timings} = this.state;
    const dayIndex = timings.findIndex((time) => time.day === day);
    const newTimings = _.cloneDeep(timings);
    newTimings[dayIndex].time[timeIndex][type] = value;
    this.setState({timings: newTimings});
  };

  handleRemoveSchedule = () => {
    const {onDeleteTime} = this.props;
    onDeleteTime && onDeleteTime();
  };

  handleScheduleFieldChange = (field, value) => {
    const {schedule} = this.state;
    let newSchedule = {...schedule};
    if (field === 'scheduleRange') {
      newSchedule = {...newSchedule, ...value};
    } else {
      newSchedule[field] = value;
    }

    this.setState({schedule: newSchedule}, () => {
      if (field === 'active') {
        this.handleSaveTimings();
      }
    });
  };

  renderEditTimings = () => {
    const {type, apiError, onDeleteTime} = this.props;
    const {timings} = this.state;
    return (
      <View>
        {type !== 'regular' ? (
          <Text style={styles.holidaysText}>Add Schedule</Text>
        ) : null}
        {this.isScheduleClosed()
          ? timings.map((timing, index) => (
              <View
                key={`week_row_${timing.day}`}
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  {type === 'regular' ? (
                    <Text style={styles.listItemDay}>
                      {Week_Day[timing.day]}
                    </Text>
                  ) : (
                    <View style={{marginTop: 5}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Checkbox.Android
                          status={!timing.isClosed ? 'checked' : 'unchecked'}
                          color="#54B948"
                          uncheckedColor="#707070"
                          onPress={() =>
                            this.handleCloseDay(timing.day, !timing.isClosed)
                          }
                        />
                        <Text
                          style={[
                            styles.listItemDay,
                            timing.isClosed ? {color: 'red'} : null,
                          ]}>
                          {Week_Day[timing.day]}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                <DayTimings
                  type={type}
                  day={timing.day}
                  timings={timing.time}
                  isClosed={timing.isClosed}
                  onCloseDay={this.handleCloseDay}
                  // closedClass={css(styles.dayClosed)}
                  onAddAnother={this.handleAddAnotherTimeForDay}
                  onDeleteDayTime={this.handleDeleteAnotherTimeForDay}
                  onTimeInputChange={this.handleTimeInputChange}
                  onTimeMeridiemChange={this.handleTimeMeridiemChange}
                />
              </View>
            ))
          : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View>
            {/* {type === 'schedule' && (
              <View>
                <Text>Unchecked boxes will not affect the schedule</Text>
              </View>
            )} */}
            <View>
              <Button
                // color="primary"
                mode="outlined"
                style={styles.updateButton}
                labelStyle={[
                  styles.updateButtonLabel,
                  {paddingLeft: 20, paddingRight: 20},
                ]}
                onPress={this.handleSaveTimings}>
                {type === 'schedule' && !onDeleteTime ? 'Save' : 'Update'}
              </Button>
              {type === 'schedule' ? (
                <Button
                  // color="primary"
                  mode="text"
                  style={[
                    // styles.updateButton,
                    {paddingLeft: 20, paddingRight: 20},
                  ]}
                  labelStyle={{
                    textTransform: 'capitalize',
                    color: !onDeleteTime ? theme.SECONDARY_COLOR : 'red',
                  }}
                  onPress={!onDeleteTime ? null : this.handleRemoveSchedule}>
                  Delete
                </Button>
              ) : null}

              {apiError ? <CustomAlert error={apiError} /> : null}
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderNonEditTimings = () => {
    const {type} = this.props;
    const {timings} = this.state;
    return (
      this.isScheduleClosed() && (
        <React.Fragment>
          {timings.map((timing) => (
            <View
              key={`week_row_${timing.day}`}
              style={{
                marginBottom: 20,
                flexDirection: 'row',
              }}>
              <Text style={[styles.listItemDay, {width: '50%'}]}>
                {Week_Day[timing.day]}
              </Text>

              {timing.isClosed ? (
                <Text style={styles.listItemClosedDay}>Closed</Text>
              ) : (
                timing.time.map((time, index) => (
                  <Text style={styles.holidaysText}>
                    {`| ${time.start}${time.startMeridiem} - ${time.close}${time.closeMeridiem}`}{' '}
                  </Text>
                ))
              )}
            </View>
          ))}
          {type === 'schedule' ? (
            <Divider style={{height: 1, marginTop: 10, marginBottom: 10}} />
          ) : null}
        </React.Fragment>
      )
    );
  };

  renderEditHeader = () => {
    const {type} = this.props;
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.addBusinessHoursText}>
          {type === 'normal' ? 'BUSINESS HOURS' : 'ADD BUSINESS HOURS'}
        </Text>
        <Icon
          name="close"
          size={32}
          color="#858585"
          onPress={this.handleCloseIcon}></Icon>
      </View>
    );
  };

  renderNonEditHeader = () => {
    const {type} = this.props;
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.holidaysText}>SCHEDULE</Text>
        <TouchableOpacity onPress={() => this.handleEditIcon('update')}>
          <Text style={styles.addScheduleButtonLabel}>MANAGE</Text>
        </TouchableOpacity>
        {/* <View>
          {type === 'schedule' && (
            <Icon name="delete" onPress={this.handleRemoveSchedule}></Icon>
          )}
        </View> */}
      </View>
    );
  };

  renderNonEditLabel = () => {
    const {type} = this.props;
    const {schedule} = this.state;
    return (
      type === 'schedule' && (
        <React.Fragment>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text>{schedule.label}</Text>
            </View>
          </View>
          <Divider style={{height: 1, marginTop: 10, marginBottom: 10}} />
        </React.Fragment>
      )
    );
  };

  renderNonEditDateRange = () => {
    const {type} = this.props;
    const {schedule} = this.state;
    return (
      type === 'schedule' && (
        <React.Fragment>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={[styles.holidaysText, {textTransform: 'capitalize'}]}>
              {schedule.closed ? 'Closed From' : 'Open From'}
            </Text>
            <Text
              style={[
                styles.holidaysText,
                {color: theme.PRIMARY_COLOR, textTransform: 'capitalize'},
              ]}>
              {' '}
              {schedule.startDate.format('D MMM YYYY')} -{' to '}
              {schedule.endDate.format('D MMM YYYY')}
            </Text>
          </View>
          <Divider style={{height: 1, marginTop: 10, marginBottom: 10}} />
        </React.Fragment>
      )
    );
  };
  renderNonEditActiveField = () => {
    const {isEdit} = this.state;
    const {type, schedule} = this.props;
    return (
      !isEdit &&
      type === 'schedule' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.holidaysText,
              {
                color: schedule.active
                  ? theme.PRIMARY_COLOR
                  : theme.SECONDARY_COLOR,
              },
            ]}>
            {schedule.active ? 'Upcoming' : 'Upcoming'}
          </Text>

          <Switch
            value={schedule.active ? true : false}
            color={theme.PRIMARY_COLOR}
            onValueChange={() =>
              this.handleScheduleFieldChange('active', !schedule.active)
            }
          />
        </View>
      )
    );
  };

  isApiError = (field) => {
    const {fieldError} = this.props;
    const apiError =
      fieldError && fieldError[field] ? fieldError[field].join('\n') : '';
    return apiError;
  };

  renderEditLabel = () => {
    const {type} = this.props;
    const {schedule, scheduleLabelError} = this.state;
    const apiError = this.isApiError('label');
    return (
      type === 'schedule' && (
        <View>
          <TextField
            value={schedule.label}
            //
            // style={styles.textInputField}
            theme={{
              roundness: 0,
              colors: {
                primary: theme.SECONDARY_COLOR,
                underlineColor: theme.SECONDARY_COLOR,
              },
            }}
            containerStyle={{
              elevation: 0,
              borderBottomWidth: 0.5,
              borderBottomColor: '#B5B5B5',
              marginBottom: 10,
            }}
            onChangeText={(value) =>
              this.handleScheduleFieldChange('label', value)
            }
            placeholder="Schedule Title"
            errorMessage={
              apiError
                ? apiError
                : scheduleLabelError
                ? 'Schedule title required'
                : ''
            }
          />
        </View>
      )
    );
  };

  renderEditBusinessClosed = () => {
    const {type} = this.props;
    const {schedule, isEdit} = this.state;
    return (
      type === 'schedule' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.holidaysText}>Business is closed</Text>
          <Switch
            // disabled={!isEdit}
            value={schedule.closed ? true : false}
            color={theme.PRIMARY_COLOR}
            onValueChange={() =>
              this.handleScheduleFieldChange('closed', !schedule.closed)
            }
          />
        </View>
      )
    );
  };
  renderEditDateRange = () => {
    const {type} = this.props;
    const {schedule, scheduleRangeError} = this.state;
    return (
      type === 'schedule' && (
        <View style={{marginTop: 10, marginBottom: 10}}>
          <Text style={styles.holidaysText}>Date Range</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <View style={{minWidth: 100}}>
              <LabelField
                roundness={28}
                label=""
                placeholder="Start Date"
                value={moment(schedule.startDate).format('DD MMM YYYY')}
                onPress={() => this.handleStartDayModalOpen()}
                containerStyle={{
                  elevation: 0,
                  borderWidth: 1,
                  borderColor: '#B5B5B5',
                }}
                inputStyle={{
                  margin: 0,
                  paddingLeft: 7,
                  paddingRight: 7,
                  color: schedule.startDate ? theme.PRIMARY_COLOR : '#919191',
                  textAlign: 'center',
                }}
              />
            </View>
            <View style={{marginLeft: 5, marginRight: 5}}>
              <Text style={styles.holidaysText}>to</Text>
            </View>
            <View style={{minWidth: 100}}>
              <LabelField
                roundness={28}
                label=""
                placeholder="End Date"
                value={moment(schedule.endDate).format('DD MMM YYYY')}
                onPress={() => this.handleEndDayModalOpen()}
                containerStyle={{
                  elevation: 0,
                  borderWidth: 1,
                  borderColor: '#B5B5B5',
                }}
                inputStyle={{
                  margin: 0,
                  paddingLeft: 7,
                  paddingRight: 7,
                  color: schedule.endDate ? theme.PRIMARY_COLOR : '#919191',
                  textAlign: 'center',
                }}
              />
            </View>
          </View>
          {scheduleRangeError ? (
            <View>
              <Text style={{color: 'red', textAlign: 'center'}}>
                *Invalid date range
              </Text>
            </View>
          ) : null}
          <Divider style={{height: 1}} />
        </View>
      )
    );
  };

  renderEditFields = () => {
    return (
      <View>
        {this.renderEditLabel()}
        {this.renderEditBusinessClosed()}
        {this.renderEditDateRange()}
        {this.renderEditTimings()}
      </View>
    );
  };

  renderNonEditFields = () => {
    return (
      <View>
        {this.renderNonEditLabel()}
        {this.renderNonEditDateRange()}
        {this.renderNonEditTimings()}
        {this.renderNonEditActiveField()}
      </View>
    );
  };

  render() {
    const {isEdit} = this.state;
    const {title, type, mode} = this.props;
    return (
      <View>
        {type === 'regular' && (
          <Text style={styles.documentsListHeading}>{title}</Text>
        )}
        <Card style={{marginTop: 16}}>
          <Card.Content>
            <View>
              {mode === 'edit' || isEdit
                ? this.renderEditHeader()
                : this.renderNonEditHeader()}
            </View>
            <View style={{margin: 10}}>
              {mode === 'edit' || isEdit
                ? this.renderEditFields()
                : this.renderNonEditFields()}
            </View>
          </Card.Content>
        </Card>

        <DatePickerDialog
          ref={(ref) => {
            this.startDayDialog = ref;
          }}
          // ref={this.startDayDialog}
          onDatePicked={this.onStartDatePicked}
          date={this.state.startDate}
        />
        <DatePickerDialog
          ref={(ref) => {
            this.endDayDialog = ref;
          }}
          // ref={this.endDayDialog}
          onDatePicked={this.onEndDatePicked}
          date={this.state.endDate}
        />
      </View>
    );
  }
}

export default BusinessTimings;

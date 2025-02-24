import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
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
} from 'react-native-paper';
import _ from 'lodash';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import BusinessTimings from './businessTimings';
import {Week_Day, Default_Timing, NewEntities} from '../../../config';
import {formatTimingToEdit, formatTimingToSave} from '../../../utils';
import {
  createCalenderSchedule,
  updateCalenderSchedule,
  deleteCalenderSchedule,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import styles from '../../styles/businessPlaceProfile.style';
import theme from '../../styles/theme.style';
import AddCircleIcon from '../../assets/img/add_circle.svg';
import CustomAlert from '../custom/customAlert';

function initSchedules({place, mode}) {
  if (place && place.id) {
    return mode === 'edit' ? _.cloneDeep(place.calendars) : [];
  }
  return [];
}

class CalendarSchedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: initSchedules(props),
      isAddNewOn: false,
      isEdit: false,
      schedule: null,
      showDelete: false,
      deleted: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      createScheduleStatus,
      updateScheduleStatus,
      deleteScheduleStatus,
      resetBusinessUpdateStatus,
    } = nextProps;

    let isUpdateState = false;
    if (createScheduleStatus) {
      resetBusinessUpdateStatus('create-schedule');
      isUpdateState = true;
    }
    if (updateScheduleStatus) {
      resetBusinessUpdateStatus('update-schedule');
      isUpdateState = true;
    }
    if (deleteScheduleStatus) {
      resetBusinessUpdateStatus('delete-schedule');
      isUpdateState;
    }
    if (isUpdateState) {
      return {
        isAddNewOn: false,
        schedules: initSchedules(nextProps),
        schedule: null,
      };
    } else {
      return null;
    }
  }

  findUpdatedSchedule = (scheduleId) => {
    const {schedules} = this.state;
    return schedules.find((schedule) => schedule.id === scheduleId);
  };

  handleTimingUpdate = (
    scheduleId,
    timings,
    {startDate, endDate, ...schedule},
  ) => {
    const {
      createCalenderSchedule,
      updateCalenderSchedule,
      token,
      place,
    } = this.props;
    const {isAddNewOn, schedule: currentSchedule} = this.state;
    const newTimings = formatTimingToSave(timings);
    const updatedSchedule = isAddNewOn
      ? currentSchedule
      : this.findUpdatedSchedule(scheduleId);
    schedule.date_from = startDate.format('YYYY-MM-DD');
    schedule.date_to = endDate.format('YYYY-MM-DD');
    delete updatedSchedule.id;
    const payload = {
      ...updatedSchedule,
      ...schedule,
      timing: newTimings,
    };
    if (isAddNewOn) {
      createCalenderSchedule(place.id, {...payload}, token);
    } else {
      delete payload.created_at;
      delete payload.updated_at;
      updateCalenderSchedule(scheduleId, place.id, {...payload}, token);
    }
  };

  handleAddNewSchedule = () => {
    const newSchedule = _.cloneDeep(NewEntities.calendar);
    newSchedule.id = '--new--';
    newSchedule.date_from = moment().format('YYYY-MM-DD');
    newSchedule.date_to = moment().add(1, 'year').format('YYYY-MM-DD');
    newSchedule.timing = formatTimingToSave(Default_Timing);
    this.setState({
      schedule: newSchedule,
      isAddNewOn: true,
    });
  };

  handleDeleteSchedule = (id) => {
    this.setState({showDelete: true, deleted: this.findUpdatedSchedule(id)});
  };

  handleDeleteCancel = () => {
    this.setState({showDelete: false, deleted: null});
  };

  doDeletePlace = () => {
    const {deleted, showDelete} = this.state;
    const {deleteCalenderSchedule, token, place} = this.props;
    if (showDelete && deleted) {
      deleteCalenderSchedule(deleted.id, place.id, token);
      this.setState({showDelete: false, deleted: null, schedule: null});
    }
  };

  render() {
    const {
      schedules,
      isEdit,
      schedule,
      showDelete,
      deleted,
      isAddNewOn,
    } = this.state;
    const {
      mode,
      createScheduleLoading,
      createScheduleError,
      updateScheduleLoading,
      updateScheduleError,
      deleteScheduleLoading,
      deleteScheduleError,
    } = this.props;

    const addNewDisabled = mode === 'add' ? true : mode === 'edit' && isEdit;

    return (
      <React.Fragment>
        <GlobalOverlayLoading
          loading={
            createScheduleLoading ||
            updateScheduleLoading ||
            deleteScheduleLoading
          }
          textContent=""
        />
        <Text style={styles.documentsListHeading}>
          SPECIAL SCHEDULES AND HOLIDAYS
        </Text>
        {schedules.map(
          ({id, label, timing, active, closed, date_from, date_to}) => (
            <BusinessTimings
              mode={
                !isAddNewOn && schedule && schedule.id === id ? 'edit' : 'read'
              }
              key={`schedule-card-${id}`}
              type="schedule"
              title=""
              timings={formatTimingToEdit(timing, Week_Day)}
              schedule={{
                label: label,
                active: active,
                closed: closed,
                startDate: date_from,
                endDate: date_to,
              }}
              onEditTime={(isEdit) => {
                if (isEdit) {
                  const {schedules} = this.state;
                  const schedule = schedules.find(
                    (schedule) => schedule.id === id,
                  );
                  this.setState({schedule});
                } else {
                  this.setState({schedule: null, isAddNewOn: false});
                }
              }}
              onDeleteTime={() => {
                this.handleDeleteSchedule(id);
              }}
              onUpdateTime={(timing, updatedSchedule) =>
                this.handleTimingUpdate(id, timing, updatedSchedule)
              }
              apiError={
                mode === 'add' ? createScheduleError : updateScheduleError
              }
            />
          ),
        )}

        {isAddNewOn && schedule ? (
          <BusinessTimings
            mode="edit"
            key={`schedule-card-add-edit`}
            type="schedule"
            title=""
            timings={formatTimingToEdit(schedule.timing, Week_Day)}
            apiError={
              mode === 'add' ? createScheduleError : updateScheduleError
            }
            schedule={{
              label: schedule.label || '',
              active: schedule.active || true,
              closed: schedule.closed | false,
              startDate: schedule.date_from,
              endDate: schedule.date_to,
            }}
            onEditTime={(isEdit) => {
              if (isEdit === false) {
                this.setState({schedule: null, isAddNewOn: false});
              }
            }}
            onUpdateTime={(timing, updatedSchedule) =>
              this.handleTimingUpdate(schedule.id, timing, updatedSchedule)
            }
          />
        ) : null}
        <TouchableOpacity
          disabled={isAddNewOn || (!isAddNewOn && schedule) ? true : false}
          onPress={() => this.handleAddNewSchedule()}>
          <Card style={styles.businessHoursCard}>
            <Card.Content style={{alignItems: 'center'}}>
              <AddCircleIcon />
              <Text style={styles.newScheduleText}>
                Add a new Special Schedule
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* <DeleteModal
          isOpen={showDelete}
          title="Confirmation!"
          description={`Are you sure you want to delete [${
            showDelete ? deleted.label : ''
          }] schedule?`}
          handleToggle={this.handleDeleteCancel}
          handleDelete={this.doDeletePlace}
        /> */}
        <Portal>
          <Dialog
            visible={showDelete}
            onDismiss={this.handleDeleteCancel}
            style={{padding: 16, borderRadius: 16}}>
            <Text>{`Are you sure you want to delete [${
              showDelete ? deleted.label : ''
            }] schedule?`}</Text>
            {deleteScheduleError ? (
              <CustomAlert error={deleteScheduleError} />
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 16,
                marginTop: 16,
              }}>
              <Button
                mode="contained"
                style={styles.deleteButton}
                labelStyle={styles.deleteButtonLabel}
                onPress={this.doDeletePlace}>
                Delete
              </Button>
              <View>
                <Text> </Text>
              </View>
              <Button
                mode="contained"
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonLabel}
                onPress={this.handleDeleteCancel}>
                Cancel
              </Button>
            </View>
          </Dialog>
        </Portal>
      </React.Fragment>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    token: state.user.token,
    place: state.business.place,
    createScheduleLoading: state.business.loading['create-schedule'] || false,
    createScheduleError: state.business.error['create-schedule'] || '',
    createScheduleStatus:
      state.business.businessUpdateStatus['create-schedule'] || false,
    updateScheduleLoading: state.business.loading['update-schedule'] || false,
    updateScheduleError: state.business.error['update-schedule'] || '',
    updateScheduleStatus:
      state.business.businessUpdateStatus['update-schedule'] || false,
    deleteScheduleLoading: state.business.loading['delete-schedule'] || false,
    deleteScheduleError: state.business.error['delete-schedule'] || '',
    deleteScheduleStatus:
      state.business.businessUpdateStatus['delete-schedule'] || false,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createCalenderSchedule,
      updateCalenderSchedule,
      deleteCalenderSchedule,
      resetBusinessUpdateStatus,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSchedules);

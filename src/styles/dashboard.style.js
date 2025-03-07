import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 16,
    marginLeft: 20,
    marginRight: 20,
  },
  sliderDot: {
    width: 13,
    height: 13,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: theme.PRIMARY_COLOR,
  },
  inactiveSliderDot: {
    width: 13,
    height: 13,
    borderRadius: 10,
    backgroundColor: '#C7C6C6',
    marginHorizontal: 5,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 16,
    color: '#E2BC65',
  },
  dateText: {
    fontSize: 24,
    fontFamily: 'Roboto',
    lineHeight: 26,
    color: '#4F4F4F',
    fontWeight: theme.FONT_WEIGHT_LIGHT,
  },
  setupButton: {
    borderColor: '#DD9900',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  setupButtonLabel: {
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 19,
    color: '#DD9900',
    textTransform: 'none',
  },
  metricsCard: {
    minHeight: 216,
    borderRadius: 17,
    elevation: 2,
    marginBottom: 1,
  },
  metricsLabel: {
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#858585',
    textTransform: 'none',
    textAlign: 'center',
    marginTop: -5,
  },
  metricsValue: {
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#000000',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textAlign: 'center',
  },
  metricsArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 5,
  },
  waterContainer: {
    height: 120,
    width: 120,
    elevation: 2,
    borderRadius: 80,
    position: 'absolute',
    right: -5,
    top: -15,
  },
  metricsContainer: {
    width: 110,
    alignItems: 'center',
  },
  glassCount: {
    fontSize: 16,
    lineHeight: 24,
    color: '#137CB1',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  water: {
    fontSize: 10,
    lineHeight: 24,
    color: '#090909',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  sessionCard: {
    minHeight: 136,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 1,
    width: '49%',
  },
  done: {
    fontSize: 12,
    lineHeight: 16,
    color: '#54B948',
    fontFamily: 'Roboto',
  },
  lastActivityName: {
    fontSize: 14,
    lineHeight: 18,
    color: '#B5B5B5',
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  lastActivityDay: {
    fontSize: 12,
    lineHeight: 24,
    color: '#B5B5B5',
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    marginTop: 10,
  },
  lastActivityTime: {
    fontSize: 12,
    lineHeight: 16,
    color: '#B5B5B5',
    fontFamily: 'Roboto',
    letterSpacing: 0,
  },
  activityName: {
    fontSize: 14,
    lineHeight: 16,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  activityDay: {
    fontSize: 12,
    lineHeight: 24,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    marginTop: 10,
  },
  activityTime: {
    fontSize: 12,
    lineHeight: 16,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
    letterSpacing: 0,
  },
  lastSessionText: {
    fontSize: 12,
    lineHeight: 24,
    color: '#61C2FF',
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 10,
  },
  nextSessionText: {
    fontSize: 12,
    lineHeight: 24,
    color: '#DD9900',
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 10,
  },
  fakeSheetCt: {
    backgroundColor: '#f8fcff',
    width: '100%',
    // position: 'absolute',
    bottom: -3,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 16,
    elevation: 6,
  },
  hypeScreenIcon: {
    height: 120,
    width: 120,
    backgroundColor: '#DCDCDC',
    borderRadius: 60,
    marginTop: 70,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    color: theme.PRIMARY_COLOR,
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 24,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  hypeDescription: {
    fontSize: 12,
    lineHeight: 24,
    color: '#b5b5b5',
    fontFamily: 'Roboto',
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  nextButton: {
    borderRadius: 25,
    paddingLeft: 30,
    paddingRight: 30,
    paddingVertical: 1,
  },
  nextButtonLabel: {
    fontSize: 16,
    fontFamily: 'Roboto',
    lineHeight: 24,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textTransform: 'none',
    letterSpacing: 0,
  },
  cancelButtonLabel: {
    fontSize: 16,
    fontFamily: 'Roboto',
    lineHeight: 24,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: '#B5B5B5',
    textTransform: 'none',
    letterSpacing: 0,
  },
  targetHeader: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '96%',
  },
  stepNumber: {
    fontSize: 16,
    lineHeight: 25,
    color: theme.PRIMARY_COLOR,
    paddingLeft: 10,
  },
  doneButtonLabel: {
    fontSize: 16,
    lineHeight: 21,
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontFamily: 'Roboto',
  },
  targetText: {
    fontSize: 18,
    lineHeight: 27,
    color: '#4F4F4F',
  },
  targetTextField: {
    margin: 6,
    marginLeft: 11,
    marginRight: 11,
    textAlign: 'left',
    height: 28,
    flex: 1,
    color: '#4F4F4F',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Roboto',
  },
  iconSurface: {
    borderRadius: 8,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 7,
  },
  daySurface: {
    borderRadius: 8,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  targetCard: {
    minHeight: 96,
    borderRadius: 8,
    elevation: 2,
  },
  cardType: {
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#858585',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  targetValue: {
    fontSize: 32,
    fontFamily: 'Roboto',
    lineHeight: 42,
    color: '#4F4F4F',
    fontWeight: theme.FONT_WEIGHT_LIGHT,
  },
  currentValue: {
    fontSize: 32,
    fontFamily: 'Roboto',
    lineHeight: 42,
    color: '#54B948',
    fontWeight: theme.FONT_WEIGHT_LIGHT,
  },
  targetUnit: {
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#4F4F4F',
  },
  currentUnit: {
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#54B948',
  },
  biometricsDescription: {
    fontSize: 14,
    lineHeight: 16,
    color: '#858585',
    fontFamily: 'Roboto',
  },
  descriptionCard: {
    // minHeight: 128,
    borderRadius: 8,
    elevation: 2,
  },
  fakeSheetButtons: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 16,
    elevation: 10,
  },
  manageButton: {
    borderColor: theme.PRIMARY_COLOR,
    borderRadius: 8,
    width: '47%',
    paddingVertical: 3,
    elevation: 0,
  },
  manageButtonLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textTransform: 'none',
  },
  trendsButton: {
    borderColor: theme.PRIMARY_COLOR,
    borderRadius: 8,
    width: '47%',
    paddingVertical: 3,
    backgroundColor: '#f8fcff',
    elevation: 0,
  },
  totalCard: {
    minHeight: 64,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 1,
    width: '40%',
  },
  totalText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  totalValue: {
    fontSize: 20,
    lineHeight: 26,
    color: theme.PRIMARY_COLOR,
    fontFamily: 'Roboto',
  },
  totalUnit: {
    fontSize: 12,
    lineHeight: 16,
    color: '#858585',
    fontFamily: 'Roboto',
  },
  totalDate: {
    fontSize: 10,
    lineHeight: 14,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
  },
  sessionsCard: {
    minHeight: 96,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 1,
  },
  sessionsLabel: {
    fontSize: 10,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#4F4F4F',
    textAlign: 'center',
    marginTop: -5,
  },
  sessionsValue: {
    fontSize: 13,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#4f4f4f',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textAlign: 'center',
  },
  activitiesCard: {
    minHeight: 268,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 1,
    paddingBottom: 16,
  },
  ringContainer: {
    top: -60,
  },
  activitiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#DD5958',
    height: 48,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  activitiesHeading: {
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#fff',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textAlign: 'center',
  },
  activitiesIconContainer: {
    height: 32,
    width: 32,
    elevation: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
    paddingTop: 3,
  },
  doneActivityName: {
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#B5B5B5',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    width: 100,
    marginLeft: 20,
  },
  doneActivityTime: {
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#B5B5B5',
    fontWeight: theme.FONT_WEIGHT_LIGHT,
    width: 120,
    // marginRight: 20,
    marginLeft: 20,
    textTransform: 'uppercase',
  },
  pendingActivityName: {
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#4F4F4F',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    width: 100,
    marginLeft: 20,
  },
  pendingActivityTime: {
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#4F4F4F',
    fontWeight: theme.FONT_WEIGHT_LIGHT,
    width: 120,
    // marginRight: 10,
    marginLeft: 20,
    textTransform: 'uppercase',
  },
  biometricsEmptyCardHeading: {
    fontSize: 24,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#0065AB',
    textAlign: 'center',
    marginTop: 15,
  },
  biometricsEmptyCardDesc: {
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#858585',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default styles;

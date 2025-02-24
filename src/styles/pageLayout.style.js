import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 2,
    backgroundColor: '#fff',
  },
  topBarTitle: {
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#e4e4e4',
  },
  container: {
    backgroundColor: '#fff',
  },
  topBarDoneButton: {
    marginLeft: -30,
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});

export default styles;

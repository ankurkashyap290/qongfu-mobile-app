import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  newHomePageTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    marginRight: 8,
  },
  newTopBarLabel: {
    fontSize: 12,
    color: '#3D3D3D',
    fontWeight: 'bold',
    letterSpacing: -1.2,
    textTransform: 'uppercase',
    paddingRight: 15,
    paddingLeft: 10,
  },
  newTopBarButton: {
    minWidth: 120,
    height: 31,
    elevation: 2,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default styles;

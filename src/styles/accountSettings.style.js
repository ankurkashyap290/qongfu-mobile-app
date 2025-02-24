import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  listHeadings: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9f9e9e',
    // marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
  },
  list: {
    // width: '0%',
    margin: 15,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
  },
  actionSettings: {
    width: 400,
    marginLeft: 40,
    // marginTop: 10,
  },
  messagingEnableSwitch: {
    marginRight: 40,
  },
});

export default styles;

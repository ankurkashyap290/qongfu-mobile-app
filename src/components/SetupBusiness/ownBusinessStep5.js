import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Switch, Surface, Avatar} from 'react-native-paper';
import styles from '../../styles/businessSetup.style';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Menu from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopIcon from '../../assets/img/shop_2.svg';
import {IMAGE_URL_PREFIX} from '../../../config';

const OwnBusinessStep5 = ({navigation}) => {
  const place = navigation.getParam('place') || null;
  const [ownerType, setOwnerType] = useState('');

  const handleOwnerType = (type) => {
    setOwnerType(type);
  };

  const handleContinue = () => {
    let ownershipType;
    if (ownerType === 'owner') {
      ownershipType = 0;
    } else if (ownerType === 'authorizedOwner') {
      ownershipType = 1;
    }
    NavigationService.navigate('DocumentUploadStep6', {
      reset: true,
      configLoaded: false,
      place,
      ownershipType,
    });
  };

  const getLogoUrl = (place) => {
    return place.place_logo_url
      ? `${IMAGE_URL_PREFIX}${place.place_logo_url}`
      : `https://via.placeholder.com/728.png?text=${place.place_name}`;
  };

  return (
    <PageLayout>
      <View
        style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
        <Text style={styles.setupHeadings}>Do you own this business?</Text>
        <View style={styles.shopIconContainerStep5}>
          {place.place_logo_url ? (
            <Surface
              style={[
                {
                  elevation: 0,
                  borderRadius: 80,
                  borderColor: '#fff',
                  borderWidth: 1,
                },
              ]}>
              <Avatar.Image
                size={90}
                source={{uri: getLogoUrl(place)}}
                style={{backgroundColor: '#fff'}}
              />
            </Surface>
          ) : (
            <ShopIcon />
          )}
        </View>
        <Text style={styles.step5PlaceName}>"{place.place_name}"</Text>
        <Text style={styles.step5Location}>"{place.location}"</Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.authorizedText}>I am the owner</Text>
          <Switch
            value={ownerType === 'owner'}
            color={theme.PRIMARY_COLOR}
            onValueChange={() =>
              handleOwnerType(ownerType === 'owner' ? '' : 'owner')
            }
            style={styles.authorizedSwitch}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.authorizedText}>
            I am authorized by the owner
          </Text>
          <Switch
            value={ownerType === 'authorizedOwner'}
            color={theme.PRIMARY_COLOR}
            onValueChange={() =>
              handleOwnerType(
                ownerType === 'authorizedOwner' ? '' : 'authorizedOwner',
              )
            }
            style={styles.authorizedSwitch}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
        }}>
        <Button
          mode="contained"
          onPress={handleContinue}
          style={
            ownerType === '' ? styles.nextButtonDisable : styles.nextButton
          }
          disabled={ownerType === ''}
          labelStyle={styles.nextButtonLabel}>
          Continue
        </Button>
        <Button
          mode="text"
          onPress={() =>
            NavigationService.navigate('BusinessManage', {reset: true})
          }
          style={styles.exitButton}
          labelStyle={styles.exitButtonLabel}>
          Exit
        </Button>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OwnBusinessStep5);

import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Divider, List, Button} from 'react-native-paper';
import styles from '../../styles/settings.style';
import {CountriesList, defaultCountry} from '../../../config';
import FlagBahrain from '../../assets/img/flag_bahrain.svg';
import FlagQatar from '../../assets/img/flag_qatar.svg';
import FlagOman from '../../assets/img/flag_oman.svg';
import FlagSAU from '../../assets/img/flag_saudi_arabia.svg';
import FlagUAE from '../../assets/img/flag_uae.svg';
import FlagIndia from '../../assets/img/india-flag.svg';
import themeStyle from '../../styles/theme.style';

const screenHeight = Math.round(Dimensions.get('window').height);

const Country = props => {
  const getSelectedCountryIcon = icon => {
    if (icon === 'bahrain') {
      return <FlagBahrain />;
    } else if (icon === 'oman') {
      return <FlagOman />;
    } else if (icon === 'qatar') {
      return <FlagQatar />;
    } else if (icon === 'sau') {
      return <FlagSAU />;
    } else if (icon === 'india') {
      return <FlagIndia width={40} height={40} />;
    } else if (icon === 'uae') {
      return <FlagUAE />;
    }
  };
  return (
    <View>
      <ScrollView style={{height: screenHeight - 40}}>
        <View>
          <Text style={styles.countryHeader}>SELECT COUNTRIES</Text>
        </View>

        {CountriesList.map(item => {
          return (
            <View>
              <List.Item
                key={`${item.country_code}`}
                title={item.country}
                left={() => getSelectedCountryIcon(item.icon)}
                right={() =>
                  parseInt(item.id, 10) === defaultCountry.id ? (
                    <Button icon="check" color={themeStyle.PRIMARY_COLOR} />
                  ) : (
                    <Text style={styles.notAvailabelText}>Not Available</Text>
                  )
                }
                style={styles.countryListItem}
                titleStyle={styles.countryListTitle}
              />
              <Divider />
            </View>
          );
        })}

        <View>
          <Text style={styles.countryHeader}>
            Country selected will be your "Home Base", you will receive updates,
            promotions and other features available to this country.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Country;

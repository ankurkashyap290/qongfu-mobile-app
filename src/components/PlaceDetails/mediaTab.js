import React, {useState} from 'react';
import {
  View,
  Text,
  Picker,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {List} from 'react-native-paper';
import styles from '../../styles/placeDetails.style';
import Menu from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Math.round(Dimensions.get('window').width);

const MediaTab = props => {
  const [mediaTypeList, setMediaTypeList] = useState('All Media Type');
  const [selectedQongfu, setSelectedQongfu] = useState('All Qongfus');

  const mediaCard = [1, 2, 3, 4];
  let mediaMenu = null;
  let qongfuMenu = null;

  const setMenuRef = ref => {
    mediaMenu = ref;
  };
  const handleMediaMenu = () => {
    mediaMenu.show();
  };
  const handleMediaTypeSelect = value => {
    setMediaTypeList(value);
    mediaMenu.hide();
  };
  const setQongfuMenuRef = ref => {
    qongfuMenu = ref;
  };
  const handleQongfuMenu = () => {
    qongfuMenu.show();
  };
  const handleQongfuSelect = value => {
    setSelectedQongfu(value);
    qongfuMenu.hide();
  };
  return (
    <View>
      <View style={styles.mediaTabHead}>
        <View>
          <Text style={styles.mediaTabSelectionTitle}>Media Type:</Text>
          <View style={styles.inputAndroid}>
            {/* <Picker
              selectedValue="all"
              style={styles.mediaTabSelect}
              mode="dropdown">
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Image" value="image" />
              <Picker.Item label="Video" value="video" />
              <Picker.Item label="Gif" value="gif" />
            </Picker> */}
            {/* <Menu> */}

            {/* </Menu> */}
            <TouchableOpacity
              onPress={() => {
                handleMediaMenu();
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.selectMediaContainer}>{mediaTypeList}</Text>
                <Icon
                  name="arrow-drop-down"
                  size={25}
                  style={{textAlignVertical: 'center', marginRight: 5}}
                />
              </View>
            </TouchableOpacity>

            <Menu ref={setMenuRef} style={styles.mediaTypeList}>
              <List.Item key="all" title="All Media Type" disabled />
              <List.Item
                key="image"
                title="Image"
                onPress={() => handleMediaTypeSelect('Image')}
              />
              <List.Item
                key="video"
                title="Video"
                onPress={() => handleMediaTypeSelect('Video')}
              />
              <List.Item
                key="gif"
                title="Gif"
                onPress={() => handleMediaTypeSelect('Gif')}
              />
            </Menu>
          </View>
        </View>
        <View>
          <Text style={styles.mediaTabSelectionTitle}>Qongfu:</Text>

          <View style={styles.inputAndroid}>
            <TouchableOpacity
              onPress={() => {
                handleQongfuMenu();
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.selectMediaContainer}>
                  {selectedQongfu}
                </Text>
                <Icon
                  name="arrow-drop-down"
                  size={25}
                  style={{textAlignVertical: 'center', marginRight: 5}}
                />
              </View>
            </TouchableOpacity>
            <Menu ref={setQongfuMenuRef} style={styles.mediaTypeList}>
              <List.Item key="all" title="All Media Type" disabled />
              <List.Item
                key="cheerleading"
                title="Cheerleading"
                onPress={() => handleQongfuSelect('Cheerleading')}
              />
              <List.Item
                key="accupressure"
                title="Accupressure"
                onPress={() => handleQongfuSelect('Accupressure')}
              />
              <List.Item
                key="anmaMassage"
                title="Anma Massage"
                onPress={() => handleQongfuSelect('Anma Massage')}
              />
            </Menu>
            {/* <Picker selectedValue="all" style={styles.mediaTabSelect}>
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Cheerleading" value="cheerleading" />
              <Picker.Item label="Accupressure" value="accupressure" />
              <Picker.Item label="Anma Massage" value="anmaMassage" />
            </Picker> */}
          </View>
        </View>
      </View>
      <View>
        {mediaCard.map(item => {
          return (
            <View key={item} style={styles.mediaCardContain}>
              <Image
                source={require('../../assets/img/ID3.png')}
                style={[
                  styles.mediaCardImage,
                  {width: screenWidth - 40, height: 205},
                ]}
              />
              <View style={styles.mediaCardContent}>
                <Text style={styles.mediaCardTitle}>
                  Running at Gold Gym Riffa (Part 2)
                </Text>
                <Text style={styles.mediaCardDesc}>
                  The video is in full length which means you can just follow
                  whatever I’m doing 30s for each exercise. There are two 1min
                  rests in between. Ff you need to pause longer - feel free to
                  do so.
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default MediaTab;

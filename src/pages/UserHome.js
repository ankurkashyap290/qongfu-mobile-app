import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {getViewportHeight} from '../../utils/helper';
import PageLayout from '../layout/PageLayout';
import styles from '../styles/dashboard.style';
import UserDashboard from '../components/Dashboard/userDashboard';
import UserActivityDashboard from '../components/Dashboard/userActivityDashboard';

const data = [1, 2];

const UserHome = ({navigation}) => {
  const showSettings = navigation.getParam('showSettings');

  const SLIDER_WIDTH = Dimensions.get('window').width;

  const ITEM_WIDTH = SLIDER_WIDTH;
  const [activeSlide, setActiveSlide] = useState(0);

  const _renderItem = item => {
    if (item.item === 1) {
      return <UserDashboard showSettings={showSettings} />;
    }
    if (item.item === 2) {
      return <UserActivityDashboard />;
    }
  };

  const getPagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        inactiveDotElement={<View style={styles.inactiveSliderDot}></View>}
        dotElement={<View style={styles.sliderDot}></View>}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={{height: 10}}
      />
    );
  };

  return (
    <PageLayout>
      <View>
        <Carousel
          layout={'default'}
          data={data}
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={index => setActiveSlide(index)}
        />
        {getPagination()}
      </View>
    </PageLayout>
  );
};

export default UserHome;

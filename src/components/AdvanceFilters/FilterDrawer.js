import React, {useRef, useEffect, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import AdvanceFilterSearch from './index';
import theme from '../../styles/theme.style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setAdvanceFilterOpen} from '../../../redux/app/actions';
import {View} from 'react-native';

const FilterDrawer = ({advanceFilterOpen, setAdvanceFilterOpen, pageKey}) => {
  const refRBSheet = useRef(null);

  const [rbHeight, setRbSheetHeight] = useState(300);
  const isMapView = pageKey === 'map';

  useEffect(() => {
    if (refRBSheet) {
      if (advanceFilterOpen[pageKey]) {
        refRBSheet.current.open();
      } else {
        refRBSheet.current.close();
      }
    }
  }, [advanceFilterOpen[pageKey]]);

  const handleRbSheetClose = () => {
    setAdvanceFilterOpen(pageKey, false);
  };

  const handleRbHeight = (height) => {
    setRbSheetHeight(height);
  };

  return (
    <View
      style={
        {
          // backgroundColor: '#fff',
          // position: 'absolute',
          // flex: 1,
          // top: 0,
          // flexDirection: 'column',
          // left: pageKey === 'map' ? -100 : -150,
        }
      }>
      <RBSheet
        ref={refRBSheet}
        // height={isMapView ? 400 : 330}
        closeOnDragDown={false}
        closeOnPressMask={true}
        onClose={handleRbSheetClose}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,.3)',
          },
          draggableIcon: {
            backgroundColor: theme.SECONDARY_COLOR,
          },
          container: {
            height: rbHeight,
            borderTopColor: '#d3d3d3',
            borderTopWidth: 1,
            marginBottom: 0,
          },
        }}>
        <AdvanceFilterSearch
          pageKey={pageKey}
          setRbSheetHeight={handleRbHeight}
          isMapView={isMapView}
        />
      </RBSheet>
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    // advanceSearchFilters: state.app.advanceSearchFilters,
    advanceFilterOpen: state.app.advanceFilterOpen,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAdvanceFilterOpen,
      // setAdvanceFilter,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FilterDrawer);

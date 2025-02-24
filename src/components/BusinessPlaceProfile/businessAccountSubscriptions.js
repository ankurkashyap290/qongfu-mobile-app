import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/businessPlaceProfile.style';
import PageLayout from '../../layout/PageLayout';
import DocumentList from './documentList';
import CloudStorageCard from '../card/cloudStorageCard';
const BusinessAccountSubscriptions = props => {
  const tableData = [
    {
      label: 'Creation Date',
      value: '9:45 am January 1, 2018',
    },
    {
      label: 'Created By',
      value: 'Mohammed Al Fahad',
    },
    {
      label: 'Last Edited',
      value: '10:45 am March 1, 2018',
    },
    {
      label: 'Last Edited By',
      value: 'Mohammed Al Fahad',
    },
  ];
  return (
    <PageLayout>
      <View style={{margin: 30}}>
        <CloudStorageCard />
      </View>
    </PageLayout>
  );
};

export default BusinessAccountSubscriptions;

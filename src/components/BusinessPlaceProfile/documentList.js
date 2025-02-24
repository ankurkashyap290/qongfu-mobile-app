import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-paper';

import styles from '../../styles/businessPlaceProfile.style';
import PageLayout from '../../layout/PageLayout';

const DocumentList = ({documents}) => {
  return (
    <View>
      {documents.map((item) => (
        <View>
          <View style={styles.businessAccountInfoContainer}>
            <Text style={styles.documentsListHeading}>{item.label}</Text>
            <Text
              style={
                item.type === 'businessName'
                  ? styles.businessName
                  : styles.documentsName
              }>
              {item.document}
            </Text>
          </View>
          <Divider />
        </View>
      ))}
    </View>
  );
};

export default DocumentList;

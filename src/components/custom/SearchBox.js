import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, List} from 'react-native-paper';
import styles from '../../styles/mainLayout.style';
import Search from './search';
import _ from 'lodash';

const SearchBox = ({
  placeholder,
  data,
  searchLoading,
  onFilterData,
  onItemSelect,
  titleStyle,
}) => {
  const [openSearchList, setSearchList] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSearch = (search) => {
    let searchPayload = {search};
    onFilterData(searchPayload);
    setSearchPhrase(search);
  };
  const handleSearchFocus = () => {
    setSearchList(true);
  };
  const handleSearchBlur = () => {
    setSearchList(false);
  };

  const handleListItemClick = (value) => {
    onItemSelect && onItemSelect(value);
  };

  return (
    <View style={styles.searchBoxCt}>
      <View
        style={{
          position: 'relative',
        }}>
        <Search
          handleSearch={handleSearch}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          placeholder={placeholder}
        />
        {searchPhrase !== '' && openSearchList && (
          <View
            style={{
              ...styles.searchListView,
            }}>
            <List.Section style={{backgroundColor: '#fff', opacity: 1}}>
              {searchLoading ? (
                <List.Item title="Loading..." />
              ) : data.length === 0 ? (
                <List.Item title="Not Found" />
              ) : (
                data.map((item, index) => (
                  <List.Item
                    key={`src_${item.title}-${index}`}
                    title={item.title}
                    description={`${item.description}`}
                    titleStyle={[
                      styles.searchListTitle,
                      titleStyle ? {...titleStyle} : {},
                    ]}
                    descriptionStyle={styles.searchListDesc}
                    onPress={() => handleListItemClick(item.value)}
                  />
                ))
              )}
            </List.Section>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchBox;

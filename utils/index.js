import Toast from 'react-native-simple-toast';
import moment from 'moment';
import {
  defaultSearchFilters,
  CATEGORY_FILTERS,
  defaultCountry,
  ROLE_TYPE_BUSINESS_AUTHORIZED,
  ROLE_TYPE_BUSINESS_OWNER,
  ROLE_TYPE_BUSINESS_SPECIALIST,
} from '../config';

export const notification = function(message) {
  Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
};

export const getTimeToAmPmFormat = time => {
  return moment(time, 'hh:mm a').format('hh:mm a');
};

export const get24HoursTimeFormat = time => {
  return moment(time, 'HH:mm ').format('HH:mm ');
};

export const getTimeFormat = time => {
  return moment(time, 'hh:mm').format('hh:mm');
};

export const numberFormatter = num => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1000) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
      : Math.sign(num) * Math.abs(num);
  } else {
    return num;
  }
};

export const filterSelectedLifestyles = data => {
  const tempLifestyles = [];
  for (const item in data) {
    if (data[item] && item !== 'all') {
      if (item === 'martialArts') {
        tempLifestyles.push(' Martial Arts');
      } else {
        tempLifestyles.push(` ${item}`);
      }
    }
  }
  return tempLifestyles.toString(',');
};

export const filterSelectedItem = (itemData, selectedValue) => {
  let itemValue;
  let itemSelectedLabel;

  if (itemData.multiSelect) {
    itemValue = [];
    itemSelectedLabel = [];

    itemData.values.map(item => {
      if (
        selectedValue &&
        selectedValue
          .map(item => item.toLowerCase())
          .includes(item[itemData.fieldValue].toLowerCase())
      ) {
        itemValue.push(item[itemData.fieldValue]);
        itemSelectedLabel.push(item.label);
      }
      return item;
    });
    // extra data should always be flat list
    itemData.extraData &&
      itemData.extraData.map(item => {
        if (
          selectedValue &&
          selectedValue
            .map(item => item.toLowerCase())
            .includes(item.toLowerCase())
        ) {
          itemValue.push(item);
          itemSelectedLabel.push(item);
        }
        return item;
      });

    let totalItemsCount = itemData.values.length;
    if (itemData.extraData) {
      totalItemsCount += itemData.extraData.length;
    }

    if (
      itemValue.length > 0 &&
      itemData.selectAll &&
      itemValue.length === totalItemsCount
    ) {
      itemSelectedLabel = [itemData.allOption.label];
    } else if (itemValue.length > 0) {
      if (itemValue.length === totalItemsCount) {
        itemSelectedLabel = itemData.allLabel || 'All';
      } else if (itemValue.length > 1) {
        itemSelectedLabel = 'Multi...';
      } else {
        itemSelectedLabel = itemSelectedLabel[0];
      }
    } else if (itemValue.length === 0) {
      itemSelectedLabel = itemData.noneLabel || 'None';
    }
  } else {
    itemValue = null;
    itemSelectedLabel = '';
    if (selectedValue) {
      const foundItem = itemData.values.find(
        item => item[itemData.fieldValue] === selectedValue,
      );
      if (foundItem) {
        itemValue = foundItem[itemData.fieldValue];
        itemSelectedLabel = foundItem.label;
      }
    }
  }
  return {itemValue, itemSelectedLabel};
};

export const getFilterQueryParams = (filters, forApi) => {
  const queryParams = {};
  if (filters.search && defaultSearchFilters.search !== filters.search) {
    queryParams.search = filters.search;
  }

  if (
    filters.sortBy &&
    (forApi || defaultSearchFilters.sortBy !== filters.sortBy)
  ) {
    queryParams.sort_by = filters.sortBy;
  }

  if (filters.sortBy === 'distance') {
    queryParams.location_lat = filters.location_lat;
    queryParams.location_lng = filters.location_lng;
  }

  if (
    filters.lifestyle &&
    filters.lifestyle.length &&
    defaultSearchFilters.lifestyle.length !== filters.lifestyle.length
  ) {
    if (filters.lifestyle.length !== CATEGORY_FILTERS.length) {
      queryParams.lifestyles = filters.lifestyle.join(',');
    }
  }
  // if (
  //   filters.country &&
  //   (forApi || defaultSearchFilters.country + '' !== filters.country + '')
  // ) {
  //   queryParams.country_id = filters.country;
  // }

  if (
    filters.rated &&
    filters.rated.length &&
    defaultSearchFilters.rated.length !== filters.rated.length
  ) {
    queryParams.stars = filters.rated.join(',');
  }

  if (
    filters.areaAndCities &&
    filters.areaAndCities.length &&
    defaultSearchFilters.areaAndCities.length !== filters.areaAndCities.length
  ) {
    queryParams.location = filters.areaAndCities.join(',');
  }

  return queryParams;
};

export const isUserLoggedIn = profile => {
  if (!profile) {
    return false;
  }
  if (
    profile.first_name.trim() === '##FIRST##' &&
    profile.last_name.trim() === '##LAST##'
  ) {
    return false;
  } else if (
    (profile.first_name === '' || profile.first_name === null) &&
    (profile.last_name === '' || profile.last_name === null)
  ) {
    return false;
  } else {
    return true;
  }
};

export const getDistance = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export const getLocation = loc => {
  const addressComponents = loc.results[0].address_components;
  const country = addressComponents.find(item => item.types.includes('country'))
    .long_name;
  const area = addressComponents
    .filter(
      item =>
        item.types.filter(type => ['sublocality'].includes(type)).length > 0 &&
        !item.types.includes('country'),
    )
    .map(item => item.long_name)
    .join(', ');

  const city = addressComponents
    .filter(
      item =>
        item.types.filter(type => ['locality'].includes(type)).length > 0 &&
        !item.types.includes('country'),
    )
    .map(item => item.long_name)
    .join(', ');

  const region = addressComponents
    .filter(
      item =>
        item.types.filter(type =>
          ['administrative_area_level_1'].includes(type),
        ).length > 0 && !item.types.includes('country'),
    )
    .map(item => item.long_name)
    .join(', ');

  const address = loc.results[0].formatted_address;
  return {
    area,
    city,
    address,
    region,
    country,
  };
};

export const getPageKeyByRoute = routeName => {
  if (routeName === 'Explorer') {
    return 'dashboard';
  } else if (routeName === 'ExplorerSearch') {
    return 'search';
  } else if (routeName === 'MapView') {
    return 'map';
  } else {
    return 'dashboard';
  }
};

export const applyUserLocation = (filters, geoLocation, countryLocation) => {
  if (geoLocation.userAllowed) {
    filters.location_lat = geoLocation.lat;
    filters.location_lng = geoLocation.lng;
    filters.nearByArea = true;
    filters.sortBy = 'distance';
    filters.country = geoLocation.country
      ? geoLocation.country.id + ''
      : defaultCountry.id + '';
  } else {
    // disable near by if current location not found or not allowed
    filters.nearByArea = false;
    filters.sortBy = 'rating';
    filters.country = countryLocation
      ? countryLocation.country.id + ''
      : defaultCountry.id + '';
  }
  return filters;
};

export const isFilterChanged = filters => {
  const queryParams = getFilterQueryParams(filters, true);
  // country_id - ignore
  // sort_by - ignore
  // search - ignore
  // location_lat - ignore
  // location_lng - ignore
  if (queryParams.lifestyles && queryParams.lifestyles.length) {
    return true;
  }
  // country is not a filter now
  // if (`${queryParams.country_id}` !== defaultSearchFilters.country) {
  //   return true;
  // }
  if (queryParams.stars && queryParams.stars.length) {
    return true;
  }
  if (queryParams.location && queryParams.location.length) {
    return true;
  }
  return false;
};

export function formatTimeToShow(time) {
  return moment(time, 'h:mm:ss').format('hh:mm');
}

export function formatTimeToSave(time) {
  return moment(time, 'h:mm:ssA').format('HH:mm:ss');
}

export function getTimeMeridiem(time) {
  return moment(time, 'h:mm:ss').format('A');
}

export function isInputTimeValid(time) {
  const hoursMinutes = time.split(':');

  if (hoursMinutes.length !== 2) {
    return false;
  }
  const hours = hoursMinutes[0];
  const minutes = hoursMinutes[1];

  if (!(parseInt(hours, 10) <= 12 && parseInt(hours, 10) >= 0)) {
    return false;
  }

  if (hours.indexOf('.') >= 0) {
    return false;
  }

  if (!(parseInt(minutes, 10) <= 24 && parseInt(minutes, 10) >= 0)) {
    return false;
  }

  if (minutes.indexOf('.') >= 0) {
    return false;
  }

  return true;
}

export function formatTimingToEdit(dbTiming, WeekDays) {
  if (dbTiming && dbTiming.length) {
    return WeekDays.map((day, dayIndex) => {
      let availableTime = dbTiming.filter(
        time => parseInt(time.day, 10) === dayIndex + 1,
      );
      let dayTime = {
        day: dayIndex,
        isClosed: availableTime.length === 0 ? true : false,
      };
      dayTime.time = !dayTime.isClosed
        ? availableTime.map(time => {
            return {
              id: time.id || null,
              start: time.start,
              close: time.close,
            };
          })
        : [{id: null, start: '00', close: '00'}];

      return dayTime;
    });
  } else {
    return [];
  }
}

export function formatTimingToSave(editedTiming) {
  const timings = [];
  editedTiming.map(day => {
    if (!day.isClosed) {
      day.time.map(time => {
        let newTime = {
          day: parseInt(day.day, 10) + 1,
          start: time.start,
          close: time.close,
        };
        if (time.id) {
          newTime.id = time.id;
        }
        timings.push(newTime);
        return newTime;
      });
    }
    return day;
  });
  return timings;
}
export const userHasPlaces = profile => {
  const hasClaims = profile.claims && profile.claims.length > 0;
  const hasPlaces = profile.places && profile.places.length > 0;
  return hasClaims || hasPlaces;
};

export const getDocumentFieldFileName = (document, fieldKey) => {
  return `${document.name.replace(/\s/g, '-')}-${fieldKey}`;
};

export const isBusinessAdmin = profile => {
  const isAdmin =
    profile.roles &&
    profile.roles.filter(role =>
      [
        ROLE_TYPE_BUSINESS_OWNER,
        ROLE_TYPE_BUSINESS_AUTHORIZED,
        ROLE_TYPE_BUSINESS_SPECIALIST,
      ].includes(role.id),
    ).length > 0
      ? true
      : false;
  return isAdmin;
};

export const getUserRoleLabel = profile => {
  return profile.roles.length ? profile.roles[0].type : '-';
};

export const sortMediaByPosition = medias => {
  return medias.sort(function(a, b) {
    return a.position - b.position;
  });
};

export const calculateBMI = (height, weight) => {
  const tempHeight = height.value / 100;
  const tempWeight =
    weight.unit === 'pound' ? weight.value / 0.453592 : weight.value;

  return (tempWeight / (tempHeight * tempHeight)).toFixed(2);
};

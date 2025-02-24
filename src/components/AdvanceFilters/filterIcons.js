import React from 'react';
import styles from '../../styles/advanceFilter.style';
import FlagBahrain from '../../assets/img/flag_bahrain.svg';
import FlagQatar from '../../assets/img/flag_qatar.svg';
import FlagOman from '../../assets/img/flag_oman.svg';
import FlagSAU from '../../assets/img/flag_saudi_arabia.svg';
import FlagUAE from '../../assets/img/flag_uae.svg';
import FlagKuwait from '../../assets/img/flag_kuwait.svg';
import FlagIndia from '../../assets/img/india-flag.svg';
import FilterCountry from '../../assets/img/filter_country.svg';
import FilterArea from '../../assets/img/filter_areas.svg';
import FilterLifestyles from '../../assets/img/lifestyle-colored.svg';
import FilterNearBy from '../../assets/img/inner_filter_nearest.svg';
import FilterSports from '../../assets/img/inner_filter_sports.svg';
import FilterWellness from '../../assets/img/inner_filter_wellness.svg';
import FilterRecreation from '../../assets/img/inner_filter_recreation.svg';
import FilterMartialArts from '../../assets/img/inner_filter_martial_arts.svg';
import FilterFitness from '../../assets/img/inner_filter_fitness.svg';
import FilterLifestyleAll from '../../assets/img/inner_filter.svg';
import FilterRating from '../../assets/img/star_outline.svg';
import FilterSortBy from '../../assets/img/sort_by.svg';
import FilterNearest from '../../assets/img/inner_filter_nearest_blue.svg';
import FilterHighestRated from '../../assets/img/inner_filter.svg';

const countryIcon = {
  FlagBahrain: <FlagBahrain style={styles.countryIcon} />,
  FlagSAU: <FlagSAU style={styles.countryIcon} />,
  FlagKuwait: <FlagKuwait style={styles.countryIcon} />,
  FlagUAE: <FlagUAE style={styles.countryIcon} />,
  FlagQatar: <FlagQatar style={styles.countryIcon} />,
  FlagOman: <FlagOman style={styles.countryIcon} />,
  FlagIndia: <FlagIndia style={styles.countryIcon} width={40} height={40} />,
};

const filterIcon = {
  lifestyle: (
    <FilterLifestyles fill="#0099DD" style={{marginTop: 5, marginLeft: 5}} />
  ),
  country: <FilterCountry fill="#0099DD" width={30} />,
  areaAndCities: <FilterArea fill="#0099DD" />,
  nearby: <FilterNearBy fill="#0099DD" style={{marginTop: 10}} />,
  rated: <FilterRating fill="#0099DD" style={{marginTop: 5, marginLeft: 5}} />,
  sortBy: <FilterSortBy fill="#0099DD" style={{marginTop: 5, marginLeft: 5}} />,
};

const lifestylesIcon = {
  all: <FilterLifestyleAll />,
  fitness: <FilterFitness />,
  sports: <FilterSports />,
  martialArts: <FilterMartialArts />,
  wellness: <FilterWellness />,
  recreation: <FilterRecreation />,
};

const sortByIcon = {
  distance: <FilterNearest />,
  rating: <FilterHighestRated />,
};

export {countryIcon, filterIcon, lifestylesIcon, sortByIcon};

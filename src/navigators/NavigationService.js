import {NavigationActions, StackActions} from 'react-navigation';

const config = {};
const skippedRoute = [];

export function getSkipped() {
  return skippedRoute;
}

export function setSkipped(route) {
  if (!skippedRoute.includes(route)) {
    skippedRoute.push(route);
  }
}

export function removeSkipped(route) {
  if (skippedRoute.includes(route)) {
    const foundedIndex = skippedRoute.findIndex((item) => item === route);
    skippedRoute.splice(foundedIndex, 1);
  }
}

export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

export function navigate(routeName, params, skipRoute) {
  if (config.navigator && routeName) {
    skipRoute && setSkipped(skipRoute);
    const action = NavigationActions.navigate({routeName, params});
    config.navigator.dispatch(action);
  }
}

// export function reset(routeName: string, parentRouteName?: string = undefined) {
//   if (config.navigator) {
//     let params = {}
//     if (parentRouteName !== undefined) {
//       params = { key: parentRouteName }
//     }
//     const action = StackActions.reset({
//       index: 0,
//       actions: [NavigationActions.navigate({ routeName, params })],
//     })
//     config.navigator.dispatch(action)
//   }
// }

export function goBack() {
  if (config.navigator) {
    const action = NavigationActions.back({});
    config.navigator.dispatch(action);
  }
}

export function pop(n) {
  if (config.navigator) {
    const popAction = StackActions.pop({
      n,
    });
    config.navigator.dispatch(popAction);
  }
}

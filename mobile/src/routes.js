import {createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Findev',
        headerTitleAlign: "center",
      }
    }, 
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil no Github',
        headerTitleAlign: "center",
      }
    },
  }, {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#4e1ce9",
      }
    }
  })
);

export default Routes;
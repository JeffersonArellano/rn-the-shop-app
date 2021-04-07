import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ProductOverview, ProductDetail, Cart } from '../screens/index';
import Colors from '../constants/Colors';

const defaultOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: { fontFamily: 'open-sans-bold' },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsNavigation = createStackNavigator(
  {
    ProductOverview,
    ProductDetail,
    Cart,
  },
  {
    defaultNavigationOptions: defaultOption,
  }
);

export default createAppContainer(ProductsNavigation);

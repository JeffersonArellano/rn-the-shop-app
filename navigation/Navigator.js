import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ProductOverview, ProductDetail } from '../screens/index';
import Colors from '../constants/Colors';

const defaultOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsNavigation = createStackNavigator(
  {
    ProductOverview,
    ProductDetail,
  },
  {
    defaultNavigationOptions: defaultOption,
  }
);

export default createAppContainer(ProductsNavigation);

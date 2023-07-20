import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UsersScreen from './src/screens/UsersScreen';
import {SCREEN} from './src/ultils/enums';
import DetailsScreen from './src/screens/UserDetailScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UsersScreen">
        <Stack.Screen name={SCREEN.USER_SCREEN} component={UsersScreen} />
        <Stack.Screen
          name={SCREEN.USER_DETAIL_SCREEN}
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

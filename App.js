import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneScreen from './screens/PhoneScreen';
import SmsScreen from './screens/SmsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Phone">
        <Stack.Screen name="Phone" component={PhoneScreen} options={{ title: 'Ligação' }} />
        <Stack.Screen name="SMS" component={SmsScreen} options={{ title: 'SMS' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

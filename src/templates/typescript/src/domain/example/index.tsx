import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import ExampleScreen from 'domain/example/screens/example-screen';

export enum TestScreens {
  EXAMPLE = 'EXAMPLE_SCREEN',
}

const Stack = createNativeStackNavigator();

interface IProps {}

/**
 * @description example wrapper module
 * @returns {JSX.Element}
 */
const Example: FC<IProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={TestScreens.EXAMPLE} component={ExampleScreen} />
    </Stack.Navigator>
  );
};

export default Example;

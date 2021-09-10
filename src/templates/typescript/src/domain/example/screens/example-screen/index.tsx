import React from 'react';
import {Text, View} from 'react-native';

interface IProps {}

/**
 * @description example screen
 * @returns {JSX.Element}
 */
const ExampleScreen: React.FC<IProps> = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default ExampleScreen;

import React from 'react';
import {Text, View} from 'react-native';
import {LocalizedText, TextTransform} from 'react-native-localized-text';

interface IProps {}

/**
 * @description example screen
 * @returns {JSX.Element}
 */
const ExampleScreen: React.FC<IProps> = () => {
  return (
    <View>
      <LocalizedText localeKey="hello" textTransform={TextTransform.CAPITAL} />
    </View>
  );
};

export default ExampleScreen;

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Example from 'domain/example';

/**
 * @description main wrapper inside the application structure
 * @returns {JSX.Element}
 */
const Application = () => {
  return (
    <NavigationContainer>
      <Example />
    </NavigationContainer>
  );
};

export default Application;
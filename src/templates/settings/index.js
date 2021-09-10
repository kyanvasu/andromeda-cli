/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Application from 'domain/index';
import {name as appName} from './app.json';
import {I18NProvider} from 'react-native-localized-text';

import {TRANSLATIONS} from './src/locales';

//set dictionaries to the library;
I18NProvider.setTranslations(TRANSLATIONS, 'EN');
 
AppRegistry.registerComponent(appName, () => Application);
 
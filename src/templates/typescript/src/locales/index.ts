import EN from './en';
import { getTranslator } from 'react-native-localized-text';

const TRANSLATIONS = {
  EN,
};

export const translate = getTranslator(TRANSLATIONS, 'EN');

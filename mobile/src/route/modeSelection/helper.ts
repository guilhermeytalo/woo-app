import { ImageSourcePropType } from 'react-native';

export interface Mode {
  key: string;
  label: string;
  image: ImageSourcePropType;
  buttonColor: string;
  buttonTextColor: string;
}

export const MODES: Mode[] = [
  {
    key: 'individual',
    label: 'individual',
    image: require('@/assets/mode/individual.png'),
    buttonColor: '#E8C84A',
    buttonTextColor: '#5C4A00',
  },
  {
    key: 'casal',
    label: 'casal',
    image: require('@/assets/mode/couple.png'),
    buttonColor: '#D4606A',
    buttonTextColor: '#FFFFFF',
  },
  {
    key: 'familia',
    label: 'família',
    image: require('@/assets/mode/family.png'),
    buttonColor: '#E07B45',
    buttonTextColor: '#FFFFFF',
  },
  {
    key: 'amigos',
    label: 'amigos',
    image: require('@/assets/mode/friends.png'),
    buttonColor: '#7B2D3A',
    buttonTextColor: '#FFFFFF',
  },
];

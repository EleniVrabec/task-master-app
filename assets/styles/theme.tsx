import { DefaultTheme } from '@react-navigation/native';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6347',          // Primary color for active tabs and header
    background: '#0D0D0D',       // App background color
    card: '#0D0D0D',             // Header and tab bar background
    text: '#FFFFFF',             // Default text color
    border: '#c0c0c0',           // Border color for elements
    notification: '#ff9800',     // Notification badge color, if needed
  },
};

export default MyTheme;

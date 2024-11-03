import { StyleSheet } from 'react-native';

const HomeScreenStyles = StyleSheet.create({
  // Style for the loading screen container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   /*  backgroundColor: '#f0f4f8', */ // Light background
    backgroundColor: '#0D0D0D', // Light background
  },
  loadingText: {
    fontSize: 18,
    color: '#888', // Subtle loading text color
  },
  // Common container style
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', // White background for screens
    padding: 16,
  },
  // Style for the header or title container
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#4CAF50', // Green background for a theme
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Style for any step or task container
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stepText: {
    fontSize: 18,
    color: '#333',
  },
  // Style for buttons, especially for navigation buttons
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonHover: {
    backgroundColor: '#45A049', // Darker green on press
  },
  // Optional style for image (if you have images in your app)
  reactLogo: {
    height: 178,
    width: 290,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default HomeScreenStyles;
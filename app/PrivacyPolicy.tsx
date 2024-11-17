import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

const PrivacyPolicyScreen = () => {
    const openPrivacyPolicyLink = () => {
        Linking.openURL('https://docs.google.com/document/d/1i58_l7GlodOlY1HcK2TXriCLdA5zF8uDs7jh5OmaE3Y/edit?usp=sharing'); // Replace with your actual Google Doc link
      };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Our app respects your privacy. We do not collect, store, or transmit any personal data from your device to external servers. All information entered into the app is stored locally on your device using secure mechanisms, such as AsyncStorage, and is never shared or accessed by any third parties.
        </Text>
        <Text style={styles.subHeading}>Data Storage</Text>
        <Text style={styles.paragraph}>
          All data you enter into the app remains on your device. We do not have access to it, and we do not transmit or share this data with any third-party service.
        </Text>
        <Text style={styles.subHeading}>User Responsibility</Text>
        <Text style={styles.paragraph}>
          Since all data is stored locally on your device, you are responsible for any backups or transfers if needed.
        </Text>
        <Text style={styles.paragraph}>
          For any questions or concerns about our data practices, please contact [your support/contact information].
        </Text>

         {/* Button to link to the external privacy policy */}
         <TouchableOpacity onPress={openPrivacyPolicyLink} style={styles.linkButton}>
          <Text style={styles.linkButtonText}>Read Full Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  linkButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrivacyPolicyScreen;

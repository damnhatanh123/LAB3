import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { logout, useMyContextProvider } from '../index';

const Setting = ({ navigation }) => {
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Login');
    }
  }, [userLogin, navigation]);

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.buttonContainer}>
        <Button
          buttonColor="pink"
          textColor="white"
          mode="contained"
          onPress={handleLogout}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4081',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default Setting;

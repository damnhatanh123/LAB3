import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [disableGetPassword, setDisableGetPassword] = useState(true);

  const hasErrorEmail = () => !email.includes('@');

  const handleGetPassword = () => {
    firestore()
      .collection('USERS')
      .doc(email)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          setPassword(userData.password);
          setError('');
        } else {
          setPassword('');
          setError('Email không tồn tại trong hệ thống.');
        }
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
        setPassword('');
        setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      });
  };

  useEffect(() => {
    setDisableGetPassword(email.trim() === '' || !!error || hasErrorEmail());
  }, [email, error, hasErrorEmail]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        theme={{ colors: { primary: 'pink' } }}
      />
      <HelperText type='error' visible={hasErrorEmail()}>
        Địa chỉ email không hợp lệ
      </HelperText>
      {error ? (
        <HelperText type='error' visible={!!error}>
          {error}
        </HelperText>
      ) : null}
      {password ? (
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordLabel}>Your Password:</Text>
          <Text style={styles.passwordText}>{password}</Text>
        </View>
      ) : null}
      <Button
        mode='contained'
        onPress={handleGetPassword}
        disabled={disableGetPassword}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        color='pink'
      >
        Get Password
      </Button>
      <View style={styles.backButtonContainer}>
        <Button onPress={() => navigation.navigate("Login")} color='pink'>
          Back to Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    color: "pink",
    marginBottom: 50,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  passwordLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'pink',
  },
  passwordText: {
    fontSize: 18,
    marginLeft: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'pink',
  },
  buttonLabel: {
    color: 'white',
  },
  backButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default ForgotPassword;


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import { SendDirectSms } from 'react-native-send-direct-sms';

const SmsScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [bodySMS, setBodySMS] = useState('');

  const requestSmsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'Permissão para enviar SMS',
          message: 'Este aplicativo precisa de acesso para enviar mensagens SMS.',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const sendSMS = async () => {
    const hasPermission = await requestSmsPermission();
    if (hasPermission) {
      SendDirectSms(mobileNumber, bodySMS)
        .then((res) => {
          console.log('SMS enviado:', res);
          Alert.alert('Sucesso', 'SMS enviado com sucesso.');
        })
        .catch((err) => {
          console.log('Erro ao enviar SMS:', err);
          Alert.alert('Erro', 'Falha ao enviar SMS.');
        });
    } else {
      Alert.alert('Permissão negada', 'Não será possível enviar SMS.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar SMS</Text>
      <TextInput
        style={styles.input}
        placeholder="Número de telefone"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Mensagem"
        value={bodySMS}
        onChangeText={setBodySMS}
      />
      <Button title="Enviar SMS" onPress={sendSMS} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default SmsScreen;

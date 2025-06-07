import React from 'react';
import { View, Button, Alert, PermissionsAndroid, Linking, StyleSheet } from 'react-native';

const PhoneScreen = ({ navigation }) => {
  const makeCall = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Permissão para realizar chamadas',
          message: 'Este aplicativo precisa de acesso para realizar chamadas telefônicas.',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Linking.openURL('tel:123456789');
      } else {
        Alert.alert('Permissão negada', 'Não será possível realizar chamadas.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Fazer Ligação" onPress={makeCall} />
      <View style={{ marginTop: 20 }}>
        <Button title="Ir para SMS" onPress={() => navigation.navigate('SMS')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default PhoneScreen;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Home() {
  const [expoToken, setExpoToken] = useState('');

  const notificationReceivedRef = useRef();

  const notificationResponseRef = useRef();

  const [notificationReceived, setNotificationReceived] = useState(null);

  const [allNotifications, setAllNotifications] = useState({data: []});

  const navigation = useNavigation();
  const visualizarNotif = () => {
    navigation.navigate('Notificacoes', {itens: allNotifications })
  }

  useEffect(() => { //esse primeiro use effects foi feito para  toda vez que abrir a pagina home verificar a permissão de envio de notificações
    registerForPushNotificationAsync().then(token => setExpoToken(token));

    notificationReceivedRef.current = Notifications.addNotificationReceivedListener(notification => {
      setNotificationReceived(notification)
    });

    notificationResponseRef.current = Notifications.addNotificationResponseReceivedListener(notification => {
      console.log('notificação clicada: ', notification);
      
    });

  }, []);
  useEffect(() => {
    if (notificationReceived != null) {
      // console.log(notificationReceived);
      // Atualizar o estado para adicionar o novo objeto
      const { date, request: { content, identifier, trigger } } = notificationReceived;
      // console.log(notificationReceived);
      // console.log(current);

      // console.log(date, content.body, content.title);
      dados = { identifier:identifier ,date: date, bodyMessenge: content.body, titleMessage: content.title }

      setAllNotifications(prevState => ({
        ...prevState,
        data: [...prevState.data, dados]
      }));
    }
  }, [notificationReceived]);

  useEffect(() => {
    if(allNotifications != null) {
      console.log(`All: `, allNotifications);
    }
  }, [allNotifications])

  async function handleNotificationLocal() {
    schedulePushNotification();
  }

  return (
    <View style={styles.container}>
      <Text>Trabalhando com notificações no Expo!</Text>
      <Button
        title="Enviar notificação local"
        onPress={async () => {
          await handleNotificationLocal()
        }}
      />
      <Button 
      title='Visualizar notificações'
      onPress={() => {
        visualizarNotif();
      }}
      />
      <Text>{expoToken}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

async function schedulePushNotification() {  //o que vai ser enviado na notificação
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Notificação local",
      body: "Este é um teste de notificação local acionado imediatamente após o clique do botão",
    },
    trigger: null,
    // trigger: { seconds: 5 },
  });
}

async function registerForPushNotificationAsync() { // aki verificamos e pedimos permissão para enviar notificação caso o usuario não tenha permitido, e retorna um token caso seja necessario fazer o envio da notificação para este dispositivo pelo site do expo.
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Você não possui permissão para receber notificações!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync({ projectId: '15d7a8b9-61c2-4e84-bbba-39e8f7a7d622' })).data;
  console.log(token);
  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
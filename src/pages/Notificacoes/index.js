import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, Dimensions, SafeAreaView, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });


export default function Notificacoes() {
  const navigation = useNavigation();
  const route = useRoute();
  const [allNotifications, setAllNotifications] = useState(route.params?.itens);

  console.log(allNotifications)


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{display:'flex', flexDirection:'column', alignItems:'center' , gap:10}}>
          <Text>Clique em uma notificação para exibir os detalhes da mesma</Text>
        {allNotifications.data.map(el => (
          <Pressable onPress={() => {navigation.navigate('DetalhaNot', {itens: {identifier:el.identifier,date:el.date,bodyMsg:el.bodyMessenge,title: el.titleMessage}})}} style={{cursor:'pointer',display:'flex',alignItems:'center',width: '95%', height: 200, borderRadius:10 ,borderWidth:0, borderWidth:2,padding:20 }} key={el.identifier}>
            <View style={{display:'flex',alignItems:'center', gap:5}}>
              <Text>Notification Title: {el.titleMessage}</Text>
              <Text>data:*********</Text>
              <Text>Notification Body: ***********</Text>
            </View>
            <View></View>
          </Pressable>
        ))}
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}
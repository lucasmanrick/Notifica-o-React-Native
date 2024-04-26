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


export default function DetalhaNot() {
  const navigation = useNavigation();
  const route = useRoute();
  const [allNotifications, setAllNotifications] = useState(route.params?.itens);
  // const [date,setDate] = useState(new Date (route.params?.itens.date)) 

  return (
    <SafeAreaView>
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%'}}>
          <View style={{display:'flex',alignItems:'center',justifyContent:'center',width: '95%', height: 400, borderRadius:10 ,borderWidth:0, borderWidth:2,padding:20 }}>
            <View style={{display:'flex',alignItems:'center', gap:5}}>
              <Text style={{fontSize:18}}>Notification Title: {allNotifications.title}</Text>
              <Text style={{fontSize:18}}>data:{allNotifications.date}</Text>
              <Text style={{fontSize:18}}>Notification Body: {allNotifications.bodyMsg}</Text>
            </View>
          </View>
        </View>
    </SafeAreaView>

  )
}
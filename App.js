import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './src/pages/Home/index'
import Notificacoes from "./src/pages/Notificacoes";
import DetalhaNot from "./src/pages/DetalhaNot";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Home',
            headerShown: false
          }}
        />
       <Stack.Screen
          name='Notificacoes'
          component={Notificacoes}
          options={{
            title: 'Notificações',
            headerStyle: {
              backgroundColor: '#FCAC17'
            }
          }}
        /> 
        <Stack.Screen
          name='DetalhaNot'
          component={DetalhaNot}
          options={{
            title: 'Notificações',
            headerStyle: {
              backgroundColor: '#aef'
            }
          }}
        /> 
      </Stack.Navigator>
    
    </NavigationContainer>
  )
}
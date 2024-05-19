import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landingpage from './screens/Landingpage';
import Signinscreen from './screens/Signinscreen';
import Signupscreen from './screens/Signupscreen';
import Homescreen from './screens/Homescreen';
import Postcreatescreen from './screens/Postcreatescreen';
import Postdetailscreen from './screens/Postdetailscreen';
import Postlistscreen from './screens/Postlistscreen';
import { PostProvider } from './Postcontext';

const Stack = createStackNavigator();

function App() {
  return (
    <PostProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landingpage">
          <Stack.Screen name="Landingpage" component={Landingpage} options={{headerShown: false}} />
          <Stack.Screen name="Signinscreen" component={Signinscreen} options={{headerShown: false}}/>
          <Stack.Screen name="Signupscreen" component={Signupscreen} options={{headerShown: false}}/>
          <Stack.Screen name="Homescreen" component={Homescreen} options={{headerShown: false}}/>
          <Stack.Screen name="Postcreatescreen" component={Postcreatescreen} options={{headerShown: false}}/>
          <Stack.Screen name="Postdetailscreen" component={Postdetailscreen} options={{headerShown: false}}/>
          <Stack.Screen name="Postlistscreen" component={Postlistscreen} options={{headerShown: false}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </PostProvider>
  );
}

export default App;
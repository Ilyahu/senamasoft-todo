import Button from '@ant-design/react-native/lib/button';
import Todo from './components/Todo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { List } from '@ant-design/react-native';
import {QueryClient, QueryCache, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query!.meta!.errorMessage) {
        if (error instanceof Error) {
          error.message = query!.meta!.errorMessage.toString()
        }
      }
    }
  }),
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View>
        <Todo/>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
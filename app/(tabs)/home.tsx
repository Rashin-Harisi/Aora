import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/UserContext'

const Home = () => {
  const {user,isLogged,isLoading} = useGlobalContext()
  console.log(user,isLoading,isLogged);
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>Home</Text>
    </View>
  )
}

export default Home
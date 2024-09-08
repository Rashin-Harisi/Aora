import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '@/context/GlobalProvider'


const Welcome = () => {

  const {loading,isLogged} = useGlobalContext();
  
  if(!loading && isLogged) return <Redirect href="/home" />


  return (
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView contentContainerStyle={{
          height: "100%",
        }}>
          <View className='w-full flex items-center justify-center h-full px-4'>
            <Image source={images.logo} resizeMode='contain' className='w-[130px] h-[84px]' />
            <Image source={images.cards} resizeMode='contain' className='max-w-[380px] h-[298px]' />
            <View className='relative'>
              <Text className='text-3xl text-white font-bold text-center'>
                Discover Endless{"\n"}
                Possibilities with{" "}
                <Text className='text-secondary-200'>Aora</Text>
              </Text>
              <Image source={images.path} resizeMode='contain'
                className='w-[136px] h-[15px] absolute -bottom-2 -right-8' />
            </View>
            <Text className='text-sm text-gray-100 font-pregular mt-7 text-center'>
              Where Creativity Meets Innovation: Embark on a Journey of Limitless
              Exploration with Aora
            </Text>
            <CustomButton title="Continue with Email"
              handlePress={() => router.push('/sign-in')}
              containerStyle="w-full mt-7" />
          </View>
        </ScrollView>
        <StatusBar style='light' backgroundColor='#161622' />
      </SafeAreaView>
  )
}

export default Welcome


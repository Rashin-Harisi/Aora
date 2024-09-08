import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'


const SignIn = () => {
  const {setUser,setIsLogged}= useGlobalContext();
  const [isSubmitting,setIsSubmitting]= useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const submitHandler =async()=>{
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields")
    }

    setIsSubmitting(true);
    try {
      const session= await signIn(form.email, form.password)
      setUser(session)
      setIsLogged(true)
      Alert.alert("Success", "User successfully signed in.")
      if(session) router.replace('/home')
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView>
        <View className='w-full flex justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px]' />
          <Text
            className='text-2xl text-white mt-10 font-psemibold'>
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address" />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyle="mt-7" />
          <CustomButton
            title="Sign In"
            handlePress={submitHandler}
            containerStyle='mt-7'
            isLoading={isSubmitting}
            />
            <View className='flex justify-center pt-5 flex-row gap-2'>
              <Text className='text-gray-100 text-lg font-pregular'>Don't have an account?</Text>
              <Link href='/sign-up' className='text-secondary font-psemibold text-lg'>Signup</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
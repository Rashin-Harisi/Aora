import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/UserContext'
import useAppwrite from '@/lib/useAppwrite';
import { getUserPosts, signOut } from '@/lib/appwrite';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';

import { icons } from '@/constants';
import { StatusBar } from 'expo-status-bar';

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))


  const logOut = async () => {
    await signOut();
    setUser(null)
    setIsLogged(false)
    router.replace("/sign-in")
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }: any) => (
          <VideoCard
            id={item.$id}
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}

          />)}
        ListHeaderComponent={() => (
          <View className='w-full flex justify-center items-center mt-6 mb-12'>
            <TouchableOpacity onPress={logOut}
              className='flex w-full items-end mb-10'>
              <Image source={icons.logout} resizeMode='contain'
                className='w-6 h-6' />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg flex justify-center items-center'>
              <Image source={{ uri: user?.avatar }} resizeMode='cover'
                className='w-[90%] h-[90%] rounded-lg'
              />
            </View>
            <View className='flex flex-row mt-5'>
              <View className='flex mr-10'>
                <Text className='text-xl text-white text-center font-psemibold'>{user?.username}</Text>
                <Text className='text-sm text-gray-100 text-center  font-pregular'>Username</Text>
              </View>
              <View className='flex mr-10 '>
                <Text className='text-xl text-white text-center font-psemibold'>{posts.length}</Text>
                <Text className='text-sm text-gray-100 text-center  font-pregular'>Posts</Text>
              </View>
            </View>
          </View>

        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found!"
            subtitle="No videos found for this profile" />
        )}
      />
      <StatusBar style='light' backgroundColor='#161622' />
    </SafeAreaView>
  )
}

export default Profile


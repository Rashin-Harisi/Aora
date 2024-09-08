import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAppwrite from '@/lib/useAppwrite';
import {getUserSavedPosts } from '@/lib/appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import { useGlobalContext } from '@/context/GlobalProvider';


const Bookmark = () => {
  const {user} = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(()=>getUserSavedPosts(user?.$id))
  const [refreshing,setRefreshing] = useState(false)
  
  const onRefresh= async()=>{
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  useEffect(() => {
   refetch()
  }, [])

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
          <View className="flex  my-6 px-4 space-y-6">
            <Text className="font-pmedium text-2xl text-gray-100">Saved Videos</Text>
          </View>

        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found!"
            subtitle="No videos found for this search query" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Bookmark
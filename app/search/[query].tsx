import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import useAppwrite from '@/lib/useAppwrite';
import { getSearchPosts } from '@/lib/appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';

import VideoCard from '@/components/VideoCard';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => getSearchPosts(query))


  useEffect(() => {
    refetch();
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }: any) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}

          />)}
        ListHeaderComponent={() => (
            <View className="flex  my-6 px-4 space-y-6">
              <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
              <Text className="text-2xl font-psemibold text-white">{query}</Text>
              <View>
                <SearchInput initialQuery={query} />
              </View>
            </View>
  
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found!"
            subtitle="No videos found for this search query" />
        )}
      />
    </SafeAreaView>
  )
}

export default Search
import { View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { router, usePathname } from 'expo-router'


const SearchInput = ({initialQuery}:{initialQuery?:any}) => {
    const pathname= usePathname();
    const [query, setQuery] = useState(initialQuery || "")

    return (
        <View className='flex flex-row items-center space-x-4 w-full h-16 px-4 
            bg-black-100 rounded-2xl border-2 border-black-200 
            focus:border-secondary'>
            <TextInput className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={query}
                onChangeText={(e) => setQuery(e)}
                placeholder="Search a video topic"
                placeholderTextColor="#CDCDE0"
            />
            <TouchableOpacity onPress={() => {
                if(query === ""){
                    Alert.alert("Missing Query","Please input something to search results across database.");
                }
                if(pathname.startsWith("/search")){
                    router.setParams({query})
                }else{
                    router.push(`/search/${query}`)
                }

            }}>
                <Image source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain' />
            </TouchableOpacity>

        </View>
    )
}

export default SearchInput
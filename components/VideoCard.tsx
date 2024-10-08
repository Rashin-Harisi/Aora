import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import { updateLikedPost } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'




interface VideoCardProps {
    title: string,
    thumbnail: string,
    video: string,
    creator: string,
    avatar: string,
    id:string,
}

const VideoCard = ({ id,title, thumbnail, video, creator, avatar }: VideoCardProps) => {
    const {user} = useGlobalContext();
    const [play, setPlay] = useState(false)

    const bookmarkedPost= async()=>{
        try {
            const result:any = await updateLikedPost(id,user.$id)
            //console.log("result",result);
            if(!result.success){
                return Alert.alert("fail","The post has been saved!")
            }else{
                return Alert.alert("success","The post added to your bookmark successfully")
            }
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
        }
    }
    return (
        <View className="flex flex-col items-center px-4 mb-14">
            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image source={{ uri: avatar }} className='w-full h-full rounded-lg'
                            resizeMode='cover'/>
                    </View>
                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <Text numberOfLines={1} className="font-psemibold text-sm text-white">
                            {title}
                        </Text>
                        <Text numberOfLines={1} className="text-xs text-gray-100 font-pregular">
                            {creator}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={bookmarkedPost}>
                    <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
                </TouchableOpacity>
            </View>
            {play ? (
                <Video 
                source={{uri:video}} 
                className='w-full h-60 rounded-xl mt-3'
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status:any)=>{
                  if(status.didJustFinish){
                    setPlay(false)
                  }
                }}  
              />
            ) : (
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className='w-full h-60 rounded-xl mt-3 relative flex justify-center items-center'>
                    <Image source={{ uri: thumbnail }}
                        className='w-full h-full rounded-xl-mt-3'
                        resizeMode='cover' />
                    <Image source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain' />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard
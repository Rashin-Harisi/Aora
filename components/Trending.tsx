import { icons } from '@/constants';
import { useState } from 'react';
import {  FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from "react-native-animatable";
import {ResizeMode, Video} from 'expo-av'


interface PostProps{
  title: string,
  thumbnail: string,
  video: string,
  creator: string,
  avatar: string,
  $id:string,
}
interface PostsProps{
  posts: PostProps[],
}

const zoomIn: any={
  0:{
    scale: 0.9
  },
  1:{
    scale:1.1
  }
}
const zoomOut : any ={
  0:{
    scale: 1.1
  },
  1:{
    scale:0.9
  }
}
const TrendingItem = ({activeItem,item}:{
  activeItem:string,
  item:PostProps,
}) =>{
  const [play,setPlay] = useState(false)
  
  //console.log("item",item);
  



  return(
    <Animatable.View 
      className='mr-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}>
      {play ? (
        <Video 
          source={{uri:item.video}} 
          className='w-52 h-72 rounded-[33px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status:any)=>{
            //console.log("Playback status:", status);
            if(status.didJustFinish){
              setPlay(false)
            }
          }}  
        />
      ): (
        <TouchableOpacity className='relative flex justify-center items-center'
          activeOpacity={0.7}
          onPress={()=>setPlay(true)}>
          <ImageBackground source={{uri:item.thumbnail}}
            className='w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'/>
          <Image source={ icons.play}
            className='w-12 h-12 absolute' resizeMode='contain'/>
        </TouchableOpacity>
      )}

    </Animatable.View>
  )
}


const Trending = ({posts}:PostsProps) => {
  const [activePost,setActivePost] = useState<any>(posts[0])

  const viewableItemsChanged = ({viewableItems}:any)=>{
    if(viewableItems.length>0){
      setActivePost(viewableItems[0].key)
    }
  }

  return (
    <FlatList data={posts}
        keyExtractor={(item:any) => item.$id }
        renderItem={({item}:any)=>(
          <TrendingItem activeItem={activePost} item={item}/>
          )}
        horizontal
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold:70
        }}
        contentOffset={{x:170, y:0}}
        
      />
  )
}

export default Trending
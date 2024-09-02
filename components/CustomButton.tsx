import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProps{
    title:string,
    handlePress: any,
    containerStyle: string,
    textStyles ?:string,
    isLoading ?:boolean,
}

const CustomButton = ({title,handlePress,containerStyle,textStyles,isLoading}:CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
        className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyle}`}
    >
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
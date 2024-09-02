import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

interface FormFieldProps {
    title: string,
    value: string,
    placeholder?: string,
    handleChangeText: any,
    otherStyle: string,
    keyboardType?: any,

}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyle, ...props }: FormFieldProps) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyle}`}>
            <Text className='text-base text-gray-100 font-pmedium'>
                {title}
            </Text>
            <View className='w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200
        focus:border-secondary flex flex-row items-center'>
                <TextInput className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    onChangeText={handleChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    secureTextEntry={title === "Password" && !showPassword}
                    {...props} />
                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide}
                            className='w-6 h-6'
                            resizeMode='contain' />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField
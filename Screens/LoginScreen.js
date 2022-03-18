import React from 'react'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import LoginForm from '../Components/loginScreen/LoginForm'


const logo = 'https://img.icons8.com/fluency/48/000000/instagram-new.png'

const LoginScreen = ({navigation}) => (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={{ uri: logo, height: 100, width: 100}} />
            </View>
            <LoginForm navigation={navigation} />
        </View>
    )

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
})


export default LoginScreen

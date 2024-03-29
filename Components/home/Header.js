import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

const handleSignout = () => {
    signOut(auth).then(() => {
        console.log('signed out')
    }).catch((error) => {
        Alert.alert(error.message)
    })
}

const Header = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSignout}>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
            </TouchableOpacity>
            
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
                    <Image style={styles.icon} source={{ uri: "https://img.icons8.com/material-rounded/50/ffffff/plus-2-math.png"}} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{ uri: "https://img.icons8.com/material-outlined/90/ffffff/filled-like.png"}} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image style={styles.icon} source={{ uri: "https://img.icons8.com/windows/90/ffffff/facebook-messenger--v1.png"}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    logo:{
        tintColor: 'white',
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    iconsContainer:{
        flexDirection: 'row',
    },
    icon:{
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    unreadBadge:{
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    unreadBadgeText:{
        color: 'white',
        fontWeight: '600'
    }
})

export default Header

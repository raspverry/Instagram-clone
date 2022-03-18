import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { View, Text, Image } from 'react-native'
import { Divider} from 'react-native-elements'

export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/48/000000/home.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/48/000000/home.png'
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/50/000000/search--v1.png',
        inactive: 'https://img.icons8.com/ios/50/000000/search--v4.png'
    },
    {
        name: 'Reel',
        active: 'https://img.icons8.com/ios-filled/50/000000/instagram-reel.png',
        inactive: 'https://img.icons8.com/ios/50/000000/instagram-reel.png'
    },
    {
        name: 'Shop',
        active: 'https://img.icons8.com/fluency-systems-filled/48/000000/shopping-bag-full.png',
        inactive: 'https://img.icons8.com/windows/32/000000/shopping-bag-full.png'
    },
    {
        name: 'Profile',
        active: 'https://img.icons8.com/ios-glyphs/30/000000/user--v1.png',
        inactive: 'https://img.icons8.com/material-outlined/24/000000/user--v1.png'
    }

]

const BottomTabs = ({icons}) => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ( { icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image source={{ uri: activeTab === icon.name ? icon.active : icon.inactive}} 
            style={[styles.icon,
            icon.name === 'Profile' ? styles.profilePic() : null,
            activeTab === 'Profile' && icon.name === activeTab ? styles.profilePic(activeTab) : null,
            ]} />
        </TouchableOpacity>
    )

    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                    ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: '3%',
        zIndex: 999,
        backgroundColor: '#000'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10,
    },
    icon: {
        width: 30, 
        height: 30,
        tintColor: 'white'
    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === 'Profile' ? 2: 0,
        borderColor: '#fff'
    }),
})

export default BottomTabs

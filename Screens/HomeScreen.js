import React from 'react'
import { ScrollView } from 'react-native'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import BottomTabs, { bottomTabIcons } from '../Components/home/BottomTabs'
import Header from '../Components/home/Header'
import Post from '../Components/home/Post'
import Stories from '../Components/home/Stories'
import { POSTS } from '../data/Posts'

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {POSTS.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </ScrollView>
            <BottomTabs icons={bottomTabIcons} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        flex: 1
    }
})

export default HomeScreen

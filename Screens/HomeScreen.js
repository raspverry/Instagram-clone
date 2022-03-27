import { collection, collectionGroup, onSnapshot, orderBy, query, } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import BottomTabs, { bottomTabIcons } from '../Components/home/BottomTabs'
import Header from '../Components/home/Header'
import Post from '../Components/home/Post'
import Stories from '../Components/home/Stories'
import { POSTS } from '../data/Posts'
import {db} from '../firebase'

const HomeScreen = ({navigation}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        /*
        const unsubscribe = onSnapshot(collectionGroup(db,'Posts'),orderBy('createdAt', 'desc'), (snapshot) => {
            //console.log(snapshot.docs.map(doc => doc.data()))
            setPosts(snapshot.docs.map(doc => doc.data()))
        })
        */
       
       const q = query(collectionGroup(db,'Posts'), orderBy('createdAt', 'desc'));
       const unsubscribe = onSnapshot(q, (querySnapshot) => {
           setPosts(querySnapshot.docs.map(post => ({ id: post.id, ...post.data() 
            })
            ))
       })
        return unsubscribe
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (
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

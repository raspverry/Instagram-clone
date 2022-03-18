import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { View, Text,StyleSheet } from 'react-native'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation} />
    </View>
)

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{ width: 30, height: 30 , tintColor: 'white'}} 
                    source={{ uri: 'https://img.icons8.com/ios/24/000000/back--v1.png'}} 
                    />
            </TouchableOpacity>
            <Text style={styles.headerText}>New post</Text>
            <Text></Text>
        </View>
)



const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },  
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },  
    headerText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 20,
        marginRight: 25,
    },
})

export default AddNewPost

import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput } from 'react-native'
import { Divider } from 'react-native-elements'
import { Button } from 'react-native'
import validUrl from 'valid-url'
import {auth, db} from '../../firebase'
import { collection, FieldValue, onSnapshot, where, addDoc, serverTimestamp, getDoc, query, QuerySnapshot } from 'firebase/firestore'

const PLACEHOLDER_IMG = 'https://img.icons8.com/ios/50/ffffff/ios-application-placeholder.png'

const uploadPostSchema = Yup.object().shape({
    imageurl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit.')
})


const FormikPostUploader = ({ navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurentLoggedInUser] = useState(null)


    const getUsername = () => {
        const user = auth.currentUser
        /*
        const unsubscribe = onSnapshot(collection(db, 'Users'),where('owner_uid', '==', user.uid),limit(1), (snapshot) => {
            snapshot.docs.map(doc => {
                setCurentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
            })
        })
        */
       
       const q = query(collection(db, 'Users'), where('owner_uid', '==', user.uid))
       const unsubscribe = onSnapshot(q, (querySnapshot) => {
           /*
           querySnapshot.docs.map(doc => {
               console.log(doc.data())
           })
           */
          setCurentLoggedInUser(querySnapshot.docs.map((doc) => (
            {
                username: doc.data().username,
                profilePicture: doc.data().profile_picture
            }
        )))
          
       })
        return unsubscribe
    }

    useEffect(() => {
        getUsername()
    }, [])
    
    const uploadPostToFire = async (imageurl, caption) => {
        const unsubscribe = await addDoc(collection(db, 'Users', auth.currentUser.email, 'Posts'), {
        imageurl: imageurl,
        user: currentLoggedInUser[0].username,
        profile_picture: currentLoggedInUser[0].profilePicture,
        owner_uid: auth.currentUser.uid,
        owner_email: auth.currentUser.email,
        caption: caption,
        createdAt: serverTimestamp(),
        likes_by_users: [],
        comments: [],
       }).then(
        () => navigation.goBack()
       )
    return unsubscribe
        
    }
    return (
        <Formik
            initialValues={{caption: '', imageurl: ''}} 
            onSubmit={(values) => {
                //console.log(values)
                //console.log('Your post was submitted successfully')
                //navigation.goBack()
                uploadPostToFire(values.imageurl, values.caption)
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
            >
                {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => 
                    <>
                        <View style={{ margin: 20, justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG}} style={{ width: 100, height: 100}} />
                            <View style={{flex: 1, marginLeft: 12}}>
                                <TextInput style={{ color: 'white', fontSize: 20}} placeholder='Write a caption...' placeholderTextColor='gray' multiline={true} 
                                    onChangeText={handleChange('caption')} 
                                    onBlur={handleBlur('caption')} 
                                    value={values.caption} />
                            </View>
                        </View>
                        <Divider width={0.2} orientation='vertical' />
                        <TextInput style={{ color: 'white', fontSize: 18}}  placeholder='Enter image Url' placeholderTextColor='gray'
                            onChangeText={handleChange('imageurl')}
                            onBlur={handleBlur('imageurl')}
                            value={values.imageurl}
                            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        />
                        {errors.imageurl && (
                            <Text style={{ fontSize: 10, color: 'red'}}>
                                {errors.imageurl}
                            </Text>
                        )}

                        <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
                    </> 
                }
        
        </Formik>
    )
}

export default FormikPostUploader

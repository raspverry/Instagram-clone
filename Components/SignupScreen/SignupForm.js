import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Pressable } from 'react-native'
import { TextInput } from 'react-native'
import { View, Text } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { Alert } from 'react-native'
import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {db, auth } from '../../firebase'
import {doc, addDoc, collection, setDoc} from 'firebase/firestore'

const SignupForm = ({navigation}) => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string()
            .required()
            .min(6, 'Your password has to have at least 6 characters')
    })

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async (email, password, username) => {
        /*
        try{
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            console.log('success!', email, password)
        } catch(error){
            Alert.alert('Error!', error.message )
        }
        */
        const pic = await getRandomProfilePicture()
        await createUserWithEmailAndPassword(auth, email, password)
        .then(
            (authUser) => {
                console.log('new account created successfully', email, password)
                setDoc(doc(collection(db, 'Users'), email),{
                    owner_uid: authUser.user.uid,
                    username: username,
                    email: email,
                    profile_picture: pic,
                })
            }
        )
        .catch((error) => {
            Alert.alert(error.message)
        })
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email: '', username: '', password: ''}}
                onSubmit={(values) => {
                    //console.log(values)
                    onSignup(values.email,values.password, values.username)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                    <>
                        <View style={[styles.inputField,
                            {
                                borderColor: 
                                    values.email.length < 1 || Validator.validate(values.email) 
                                    ? '#ccc' 
                                    : 'red'
                            },
                             ]}>
                            <TextInput 
                                placeholderTextColor='#444' 
                                placeholder='Email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                />
                        </View>

                        <View style={[styles.inputField,
                            {
                                borderColor: 
                                    values.username.length > 2 || 1> values.username.length 
                                    ? '#ccc' 
                                    : 'red'
                            },
                             ]}>
                            <TextInput 
                                placeholderTextColor='#444' 
                                placeholder='Username'
                                autoCapitalize='none'
                                keyboardType='default'
                                textContentType='username'
                                autoFocus={true}
                                secureTextEntry={false}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                />
                        </View>
                        <View style={[styles.inputField,
                            {
                                borderColor:
                                    1> values.password.length || values.password.length >= 6
                                    ? '#ccc'
                                    : 'red'
                            }
                        ]}>
                            <TextInput 
                                placeholderTextColor='#444' 
                                placeholder='Password'
                                autoCapitalize='none'
                                textContentType='password'
                                autoFocus={false}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                    
                        <Pressable titleSize={20} style={styles.button(isValid)} 
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Sign up</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Already have an acount? </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{color: '#6BB0F5'}}>Login in</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        marginTop: 80,
        width: '100%'
    },
    inputField:{
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,

    },
    button: (isValid) => ({
        backgroundColor: isValid ? '#0096f6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
    }),
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 20
    },
    signupContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50
    },
})

export default SignupForm

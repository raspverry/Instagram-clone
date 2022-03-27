import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Pressable } from 'react-native'
import { TextInput } from 'react-native'
import { View, Text, Alert } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {auth} from '../../firebase'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string()
        .required()
        .min(6, 'Your password has to have at least 6 characters')
})

const onLogin = async (email, password) => {
    /*
    try{
        await signInWithEmailAndPassword(auth, email, password).then(
            console.log('login successful', email, password)
        )
    } catch(error){
        console.log('e')
        Alert.alert(error.message)
    }
    */
   await signInWithEmailAndPassword(auth, email, password)
   .then(
        (userCredential) => {
            console.log('login successful', email, password, userCredential.user.email)
        }
    )
    .catch((error) => {
        Alert.alert(error.message)
    })
}

const LoginForm = ({navigation}) => {
    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values) => {
                    //onsole.log(values)
                    onLogin(values.email, values.password)
                }}
                validationSchema={LoginFormSchema}
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
                                placeholder='Phone number, username or email'
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
                    
                        <View style={{ alignItems: 'flex-end', marginBottom: 30}}>
                            <Text style={{color: '#6BB0F5'}}>Forgot password?</Text>
                        </View>

                        <Pressable titleSize={20} style={styles.button(isValid)} 
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                                <Text style={{color: '#6BB0F5'}}>Sign up</Text>
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

export default LoginForm

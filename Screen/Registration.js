import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native'

const Registration = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    registerUser = async (email, password, firstname, lastname) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url:'https://gokkauth.firebaseapp.com',
            })
            .then(() => {
                alert('Verification email sent')
            }).catch((error) => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstname,
                    lastname,
                    email,
                })
            })
            .catch((error) => {
                alert(error.message)
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    return (
        <View style={styles.container}>
            <ImageBackground
         
         source={require("../assets/wall.png")}
         style={styles.backgroundImage}
            >
            <Image
            source={require("../assets/Asset.png")}
            style={{ width: 300, height: 300 }}
            />
            <Text style={{fontWeight: 'bold', fontSize:40, color: 'white'}}>
                SIGN-UP
            </Text>
            <View style={{marginTop:20}}>
                <TextInput
                    style={styles.textInput}
                    placeholder='First Name'
                    onChangeText={(firstname) => setFirstname(firstname)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Last Name'
                    onChangeText={(lastname) => setLastname(lastname)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstname, lastname)}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>
                    REGISTER
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{marginTop: 20}}
            >
                <Text style={{fontWeight: 'bold', fontSize:18, color: 'white'}}>Already have an account? Login</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 10,
        width: 300,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center'
    },
    button: {
        marginTop: 10,
        height: 70,
        width: 150,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    }
})

export default Registration;
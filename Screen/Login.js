import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';


const Login = () => { //This is the login of the mobile app
    const navigation = useNavigation()//This is the code for navigation
    const [email, setEmail] = useState('')//Here you can set your email for registration
    const [password, setPassword] = useState('')//Here you can set your password for registration

    loginUser = async (email, password) => {//This is where you can login your account after registration
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)//Here it will response error if you input the wrong password or email
        } catch(error){
            alert(error.message)
        }
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
            <Text style={{fontWeight: 'bold', fontSize:40, color:'white'}}>
                SIGN-IN
            </Text>
            <View style={{marginTop:20}}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize='none'
                    autoCorrect={false}
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
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={{fontWeight: 'bold', fontSize:20}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{marginTop: 20}}
            >
                <Text style={{fontWeight: 'bold', fontSize:18, color:'white'}}>Don't have an account? Register</Text>
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
        backgroundColor: 'lightblue',
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

export default Login;
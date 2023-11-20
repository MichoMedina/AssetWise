import { Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'

const Dashboard = () => {
    const [name, setName] = useState('')
    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            }
            else {
                console.log('User does not exist')
            }
        })
    }, []) 

    return (
        <SafeAreaView style={styles.container}>

                 
            <ImageBackground
         
         source={require("../assets/wall.png")}
         style={styles.backgroundImage}
            >
                <Image
            source={require("../assets/Asset.png")}
            style={{ width: 400, height: 100 }}
            />
            <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: 50, color: 'white'}}>
                USER PROFILE
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
                EMAIL: {name.email}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
                FULLNAME: {name.firstname} {name.lastname} 
            </Text>
            <TouchableOpacity
                onPress={() => {firebase.auth().signOut()}}
                style={styles.button}
            >
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    LOGOUT
                </Text>
            </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
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
    button: {
        marginTop: 50,
        height: 50,
        width: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    }
})

export default Dashboard;
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
//import AppHeader from '../components/AppHeader';
import firebase from 'firebase';
import db from '../config';
import Signup from './Signup';

export default class loginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
               db.collection("users").add({
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name:result.additionalUserInfo.profile.family_name,
                        profile_picture:result.additionalUserInfo.profile.picture,
                        email_id:result.user.email,
                        locale: result.additionalUserInfo.profile.locale
              
                })
                 this.props.navigation.navigate('AppTabNavigator') 
                .then(() => {
        
      })
            }
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };

  googleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId:
          '346424223910-p0odq139g8p8kibhnkd2jbu8pd7gia1u.apps.googleusercontent.com',
        iosClientId:
          '346424223910-rlo6fub8krue6oo30j4ir7hdfsgcqtk9.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  userLogin = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('AppTabNavigator');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ backgroundColor: '#F59C1D', width: '100%' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              padding: 10,
            }}>
            ICarePro
          </Text>
        </View>

        <View>
          <Image style={styles.logo} source={require('../2426272.png')} />
        </View>

        <View>
          <TextInput
            placeholder="Username"
            style={[styles.inputBox, { marginTop: 60 }]}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            style={[styles.inputBox, { marginTop: 40 }]}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={[styles.buttonStyle]}
            onPress={() => {
              this.userLogin();
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignSelf:"center"}}><Text style={{fontSize:20,marginTop:20}}>-------OR-------</Text></View>
        <View style={styles.GoogleMainStyle}>
          <TouchableOpacity
            style={[styles.googleStyle ,{ marginTop:20}]}
            onPress={() => {
              this.googleLogin();
            }}>
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>
            Copyright© 2022 SMSBrother Inc.
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    padding: 10,
    backgroundColor: '#F59C1D',
    width:125,
    borderRadius: 14,
    alignItems:"center",
    borderWidth:1,   
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    marginTop: 15,
    alignSelf: 'center',
    width: 280,
    borderBottomWidth: 1.4,
    borderColor: 'black',
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EC7A22',
  },
  logo: {
    height: 200,
    width: 200,
    marginTop: 50,
    marginLeft: 75,
  },
  button: {
    marginTop:20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  copyright: {
    backgroundColor: '#F59C1D',
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: 'white',
  },
  googleStyle:{
    backgroundColor:"#F59C1D",
    position:"absolute",
    marginTop:20,  
    height:33,
    width:200,
    alignSelf:"center",
    alignItems:"center",
    borderWidth:1,
    borderRadius:8
  },
  googleText:{
    fontSize:20,
    color:"white"

  },
  GoogleMainStyle:{
  flex:4.8
  

  }
});

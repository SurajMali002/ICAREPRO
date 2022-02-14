import React, { Component } from "react";
import {
    View,
    ActivityIndicator
} from "react-native";
import firebase from "firebase";
import Home from './Home';

export default class LoadingScreen extends Component {

    componentDidMount() {
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('AppTabNavigator')
            } else {
                this.props.navigation.navigate('loginScreen')
            }
        })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

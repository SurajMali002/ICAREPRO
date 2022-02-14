import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Image
} from 'react-native';

import firebase from 'firebase';
import db from '../config';
import { Alert } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

export default class SettingScreen extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            first_name:'',
            last_name:'',
            profile_image: "",
            name: ""
        }
    }

    getUserDetails=async()=>{
        db.collection("users").where("email_id", "==", this.state.userId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    first_name:doc.data().first_name,
                    last_name:doc.data().last_name,
                    name:doc.data().first_name + doc.data().last_name,
                    profile_image:doc.data().profile_picture
                })
            })
        })
    }

    updateProfile=async()=>{
        db.collection("users").where("email_id", "==", this.state.userId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection("users").doc(doc.id).update({
                    first_name:this.state.first_name,
                    last_name:this.state.last_name,                   
                })
                .then(()=>{
                    return Alert.alert("Profile Updated")
                })
            })
        })
    }

    componentDidMount=()=>{
        this.getUserDetails()
    }
    
    render(){
        return(
            <KeyboardAvoidingView style={{flex:1, backgroundColor:"white"}}>
                <View style={{backgroundColor:"#F59C1D", width:"100%"}}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white', textAlign:'center', padding:10}} navigation={this.props.navigation}>Setting</Text>
                </View>
                <ScrollView>
                <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: this.state.profile_image }}
                            style={styles.profileImage}
                        ></Image>                        
                        <Text
                            style={styles.nameText}
                        >{this.state.name}
                        </Text>
                   
                    <View>
                        <TextInput
                            placeholder="First Name"
                            style={styles.inputBox}
                            value={this.state.first_name}
                            onChangeText={(text)=>{this.setState({first_name:text})}}
                        />
                        <TextInput
                            placeholder="Last Name"
                            style={styles.inputBox}
                            value={this.state.last_name}
                            onChangeText={(text)=>{this.setState({last_name:text})}}
                        />                      
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[styles.buttonStyle,{ marginTop:60} ]}
                            onPress={()=>{this.updateProfile()}}
                        >
                            <Text style={styles.buttonText}>
                                Update
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity style={[styles.buttonStyle ,{ marginTop:20}]}
                      onPress={()=>this.props.navigation.navigate("loginScreen")}>
                           <Text style={styles.buttonText}>Log Out</Text>
                      </TouchableOpacity>
                    </View>
                  </View>  
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    inputBox:{
        width:280,
        borderWidth:1.4,
        borderRadius:4,
        paddingLeft:5,
        fontSize:18,
        marginTop:40,
        alignSelf:'center'
    },
    buttonStyle:{
        alignSelf:'center',
        padding:10,
        backgroundColor:"#F59C1D",
        width:240,
        alignItems:'center',
        borderRadius:14,
        
    },
    buttonText:{
        color:"white",
        fontSize:20,
        fontWeight:'bold'
    },
     profileImageContainer: {
       marginTop:RFValue(20),
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage: {
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70),
        marginTop:RFValue(130)
    },

    nameText: {
        color: "black",
        fontSize: RFValue(20),
        marginTop: RFValue(10)
    },
})
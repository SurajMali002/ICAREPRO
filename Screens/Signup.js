import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import firebase from 'firebase';
import db from '../config';





export default class Signup extends React.Component{

    constructor(){
        super();
        this.state={
            first_name:'',
            last_name:'',
            contact:'',
            address:'',
            email_id:'',
            create_password:'',
            confirm_password:'',
            defaultImage:'Image1'
        }
    }

  userSignUp=async()=>{
        if(
            this.state.first_name==='' || this.state.last_name==='' || this.state.contact==='' || this.state.address==='' || this.state.email_id==='' ||  this.state.create_password==='' || this.state.confirm_password==='' 
        ){
            return Alert.alert("Input Box are empty")
        }else{
            if(this.state.confirm_password===this.state.create_password){
                firebase.auth().createUserWithEmailAndPassword(this.state.email_id, this.state.confirm_password)
                .then(()=>{
                    db.collection("users").add({
                        first_name:this.state.first_name,
                        last_name:this.state.last_name,
                        contact:this.state.contact,
                        address:this.state.address,
                        email_id:this.state.email_id,
                        profile_picture:this.state.default_Image
                          
                    })
                  this.props.navigation.navigate('loginScreen') 
                  console.log(this.state.first_name)
                })
                
                .catch((error)=> {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                })
            }
        }
    }
render(){
  let default_Image={
    Image1: require("../Avatar.png")
  }
  
   return(
           <ScrollView>
                <KeyboardAvoidingView style={{flex:1, backgroundColor:"white"}} >
                    <View style={styles.textContainer} >
                        <Text style={styles.textStyle} >Registration</Text>
                    </View>
                    <TextInput
                        placeholder="First Name"
                        onChangeText={(text)=>{this.setState({first_name:text})}}
                        style={styles.modalInputBox}
                    />
                    <TextInput
                        placeholder="Last Name"
                        onChangeText={(text)=>{this.setState({last_name:text})}}
                        style={styles.modalInputBox}
                    />
                    <TextInput
                        placeholder="Contact"
                        onChangeText={(text)=>{this.setState({contact:text})}}
                        style={styles.modalInputBox}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Address"
                        onChangeText={(text)=>{this.setState({address:text})}}
                        style={styles.modalInputBox}
                    />                   
                    <TextInput
                        placeholder="Email"
                        onChangeText={(text)=>{this.setState({email_id:text})}}
                        style={styles.modalInputBox}
                        keyboardType="email-address"
                    />
                    <TextInput
                        placeholder="Create Password"
                        onChangeText={(text)=>{this.setState({create_password:text})}}
                        style={styles.modalInputBox}
                        secureTextEntry={true}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        onChangeText={(text)=>{this.setState({confirm_password:text})}}
                        style={styles.modalInputBox}
                        secureTextEntry={true}
                    />
                    <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={()=>this.props.navigation.navigate('loginScreen')}
                        
                    >
                        <Text style={styles.buttonText} >Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                       onPress={()=>{this.userSignUp()}}
                    >
                        <Text style={styles.buttonText} >Register</Text>
                    </TouchableOpacity>
                    </View>
                    
                </KeyboardAvoidingView>
                </ScrollView>
            
        );
    }
}
   
   const styles = StyleSheet.create({
    buttonStyle:{
        alignSelf:'center',
        padding:10,
        backgroundColor:"#F59C1D",
        marginTop:60,
        width:100,
        alignItems:'center',
        borderRadius:14,
        borderWidth:1,
    
        
    },
    buttonText:{
        color:"white",
        fontSize:20,
        fontWeight:'bold'
    },
    
    textStyle:{
        fontSize:22,
        fontWeight:'bold',
        textAlign:'center',
        color:"#ffffff"
    },
    textContainer:{
        padding:14,
        backgroundColor:"#F59C1D"
    },
    modalInputBox:{
        marginTop:20,
        width:280,
        borderBottomWidth: 1.4,
        paddingLeft:6,
        fontSize:18,
        alignSelf:'center',
        borderColor:"black"
    },
    buttons:{
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',

    }
    
   
})

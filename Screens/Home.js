import * as React from 'react';
import {Header, Icon, Badge} from 'react-native-elements';

import {
    View,
    Text
} from 'react-native'

import firebase from 'firebase';
import db from '../config';


export default class Home extends React.Component{
   constructor(){
        super();
        this.state={
            email:'',
            password:''
        }
    }

    render(){
        return(
          <View style={{backgroundColor:"#F59C1D", width:"100%"}}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white', textAlign:'center', padding:10}}>Home</Text>
                </View>
    
        )   
   }
}
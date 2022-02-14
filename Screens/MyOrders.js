import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { ListItem, Card } from 'react-native-elements';

export default class MyOrders extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            myOrders:[],
            isModalVisible:false
            
        },
        this.requestRef=null
    }

    getMyOrder=async()=>{
        db.collection("orders").where("email_id", "==", this.state.userId)
        .get()
        .then(snapshot => {
        snapshot.docs.map(doc =>{
            var myorder = snapshot.docs.map((doc)=>{return doc.data()})
            this.setState({myOrders:myorder})
            console.log(this.state.myOrders)
        })
        })
    }

    componentDidMount=()=>{
        this.getMyOrder()
    }

    keyExtractor=(item, index)=>index.toString()

    renderItem=({item, i})=>{
        return(
           <ListItem
                key={i}
                title={item.medicines[0] + ", etc..."}
                subtitle={item.status}
                titleStyle={{color:"#F59C1D", fontWeight:"bold"}}
                chevron
                
                
            ><TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={()=>{this.props.navigation.navigate("MyOrderDetails", {details:item})}}
                    >
                        <Text style={styles.buttonText}>{item.medicines[0] + ", etc..."}</Text>
                    </TouchableOpacity></ListItem>       
                 
                 
                    );
    }

    render(){
        return(
            <ScrollView>
               <View style={{backgroundColor:"#F59C1D", width:"100%"}}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white', textAlign:'center', padding:10}}>MyOrders</Text>
                </View>
                
                {
                    this.state.myOrders.length===0?(
                        <View>
                            <Text>No Orders</Text>
                        </View>
                    ):(
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.myOrders}
                            renderItem={this.renderItem}
                        ></FlatList>
                    )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle:{
        alignSelf:'centre',
        padding:10,
        backgroundColor:"#F59C1D",
        width:240,
        alignItems:'center',
        borderRadius:14,
        marginTop:10,
        flex:2,
        justifyContent:"center"
    },
    buttonText:{
        color:"white",
        fontSize:20,
        fontWeight:'bold'
    },
})
import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class MedicineScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      medicine1: '',
      medicine2: '',
      medicine3: '',
      medicine4: '',
      medicine5: '',
      first_name: '',
      last_name: '',
      contact: '',
      address: '',
    };
  }

  orderMedicine = async () => {
    if (this.state.medicine1 !== '') {
      db.collection('orders')
        .add({
          medicines: [
            this.state.medicine1,
            this.state.medicine2,
            this.state.medicine3,
            this.state.medicine4,
            this.state.medicine5,
          ],
          name: this.state.first_name + ' ' + this.state.last_name,
          contact: this.state.contact,
          address: this.state.address,
          email_id: this.state.userId,
          status: 'ordered',
          date: firebase.firestore.Timestamp.now().seconds,
        })
        .then(() => {
          return Alert.alert('Order Placed');
        });
      this.props.navigation.navigate('MyOrders');
    }
  };

  getUserData = async () => {
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ first_name: doc.data().first_name });
          this.setState({ last_name: doc.data().last_name });
          this.setState({ contact: doc.data().contact });
          this.setState({ address: doc.data().address });
          this.setState({ email_id: doc.data().email_id });
        });
      });
  };

  componentDidMount = () => {
    this.getUserData();
  };

  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#F59C1D', width: '100%' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              padding: 10,
            }}
            navigation={this.props.navigation}>
            MedicineScreen
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="Medicine name"
            onChangeText={(text) => {
              this.setState({ medicine1: text });
            }}
            style={styles.inputBox}
            multiline={true}
          />
          <TextInput
            placeholder="Medicine name"
            onChangeText={(text) => {
              this.setState({ medicine2: text });
            }}
            style={styles.inputBox}
            multiline={true}
          />
          <TextInput
            placeholder="Medicine name"
            onChangeText={(text) => {
              this.setState({ medicine3: text });
            }}
            style={styles.inputBox}
            multiline={true}
          />
          <TextInput
            placeholder="Medicine name"
            onChangeText={(text) => {
              this.setState({ medicine4: text });
            }}
            style={styles.inputBox}
            multiline={true}
          />
          <TextInput
            placeholder="Medicine name"
            onChangeText={(text) => {
              this.setState({ medicine5: text });
            }}
            style={styles.inputBox}
            multiline={true}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.orderMedicine();
            }}>
            <Text style={styles.buttonText}>Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {    
    width: 280,
    borderWidth: 1.4,
    borderRadius: 4,
    paddingLeft: 4,
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 40,
    height: 40,
    alignItems:'center',
  },
  buttonStyle: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#F59C1D',
    marginTop: 60,
    width: 240,
    alignItems: 'center',
    borderRadius: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

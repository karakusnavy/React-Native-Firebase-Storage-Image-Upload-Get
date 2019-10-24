
import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import ImagePicker from 'react-native-image-picker'
//import { throwStatement, file } from '@babel/types';
//import RNFetchBlob from 'react-native-fetch-blob'
var options = {
  title: 'Resim Seçiniz',
  customButtons: [
    //  { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
var firebaseConfig = {
  apiKey: "AIzaSyB6nFbNVQIci90Q9dI7hN4ZsKPaDF4y6ec",
  authDomain: "reactnativetest-1f0da.firebaseapp.com",
  databaseURL: "https://reactnativetest-1f0da.firebaseio.com",
  projectId: "reactnativetest-1f0da",
  storageBucket: "reactnativetest-1f0da.appspot.com",
  messagingSenderId: "90332168774",
  appId: "1:90332168774:web:fb075d90d46d48cfa1c047",
  measurementId: "G-K9029NBRQX"
};
firebase.initializeApp(firebaseConfig);
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imagelocation: null,
    }
  }
  Process = async ()  =>  {
    ImagePicker.launchImageLibrary(options,(response)=>{
      if(response.didCancel)
        console.log('User cancelled image picker')
      else if(response.error)
        console.log('Error: ',response.error)
      else if(response.customButton)
        console.log('User tapped custom button')
      else
        this.UploadProcess(response.uri,response.fileName+new Date());
    })
  }
  UploadProcess = async (uri,imageName)=>{
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child('images/'+imageName);
    ref.put(blob).then((resi)=>{
      if(resi.state=='success')
      {
        firebase.storage().ref().child('images/'+imageName).getDownloadURL().then((ress)=>{
          this.setState({
            imagelocation:ress
          })
        })
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Welcome to Firebase Storage App</Text>
          <Text style={{ fontSize: 10 }} >v0.1 by @karakusnavy (storage tutorial)</Text>
          <TouchableOpacity onPress={()=>this.Process()} style={styles.button}>
            <Text style={{ fontWeight: 'bold' }}>Click for upload and get image in Firebase Storage</Text>
          </TouchableOpacity>
        </View>
        <Image
          style={styles.ImageStyle}
          source={{ uri: this.state.imagelocation }}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    justifyContent:'center',
    alignItems:'center'
  },
  button: {
    backgroundColor: 'whitesmoke',
    paddingTop:20,
    paddingBottom:20,
    paddingLeft:5,
    paddingRight:5,    
    borderRadius: 5,
    marginTop: 10,
    elevation:5,
    justifyContent:'center',
    alignItems:'center'    
  },
  ImageStyle:{
    width:150,
    height:150,
    borderWidth:1,
    borderColor:'black',
    marginTop:10
  }
});


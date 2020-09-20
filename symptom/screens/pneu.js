import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import SongList from "../components/songList";
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

var imgdata=null;
var url=null;
var cUrl=null;
//var base64Img =null;
let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
};

export default class Pneu extends React.Component  {
  state = {
    fontsLoaded: false,
    playing: false,
    search: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
    ref: null,
    res:'',
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  async componentDidMount() {
    this._loadFontsAsync();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  
  }

 
  
  getData() {
    return  [
    {
      
    name:"Forever Summer (feat. Indiiana)",
    artist:"Drenchill, Indiiana",
  },
  {
    
    name:"Dance with Me (feat. Thomas Rhett & Young Thug)",
    artist:"Diplo, Thomas Rhett, Young Thug",
  },
  {
    
    name:"Upside Down",
   
    artist:"Nayio Bitz, Nikko Culture",
  },
  {
    
    name:"This Is Real (ft. Ella Henderson)",
    
    artist:"Jax Jones, Ella Henderson",
  },
  ]
  }

  render(){
    const { hasCameraPermission } = this.state;
    const {ref} = this.state;
    let { image } = this.state;
    const takePicture = async () => {
   
            const options = {quality: 1, base64: true};
            imgdata = await this.camera.takePictureAsync(options);
            url=imgdata.uri;
            console.log('Image Captured');
            
            
            let base64Img = `data:image/jpg;base64,${imgdata.base64}`
      
            
            let cloudinary = 'https://api.cloudinary.com/v1_1/diywehkap/image/upload';
        
            let data = {
              "file": base64Img,
              "upload_preset": "hm4fkyir",
            }
            fetch(cloudinary, {
              body: JSON.stringify(data),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST',
            }).then(async r => {
              let data = await r.json()
              cUrl=data.secure_url;
              this.setState({recommendations:true});
              if(this.state.selectedIndex==1){
                  this.setState({cart:true});
              }
              console.log(cUrl);
              return cUrl
          }).catch(err=>console.log(err))

        }
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
      <Image source={require('../assets/settings.png')} style={styles.left}></Image>
      <Image source={require('../assets/help.png')} style={styles.right}></Image>
      <View style={styles.playing}>
  
            <View style={{flex:1, position:'absolute', zIndex:1, alignSelf:'center'}}>
            <Text style={{position:'relative',fontSize:20,marginTop:'10%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Pneumonia Lookup</Text>
            <Camera style={{position:'relative',marginTop:20, height:400, width:350 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View
              style={{
                backgroundColor: '#95C623',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        
            <View style={{marginTop:'5%', alignSelf:'center'}}>
            <Text style={{position:'relative',fontSize:15, textAlign:'center', textAlignVertical:'center',color:'#FFF', fontFamily:'FuturaH', backgroundColor:'#1F1F1F',paddingHorizontal:'10%', width:'40%',height:30,borderRadius:10}} onPress={()=>takePicture()}>Capture</Text>
            </View>
          </View>

      </View>
      <Text style={{position:'relative',fontSize:20,marginTop:'10%',marginLeft:'5%', textAlign:'left', color:'#364f6b', fontFamily:'FuturaH'}} onPress={()=>this.setState({search:true})}>Diagnosis</Text>
    {this.state.search &&
      <Text style={{fontFamily:'FuturaL', fontSize:20,textAlign:'center'}}>Negative</Text>
    }
    {!this.state.search &&
      <Text style={{fontFamily:'FuturaL', fontSize:20,textAlign:'center'}}>Scan your chest X-ray</Text>
    }
      
    </View>
    );
    }
    else {
    return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    position:'relative',
    backgroundColor:'#f5f5f5'
  },
  left:{
    height:'7%',
    width:'7%',
    top:'2.5%',
    resizeMode:'contain',
    left:'5%',
    position:'absolute',
  },
  right:{
    height:'7%',
    width:'7%',
    top:'2.5%',
    resizeMode:'contain',
    right:'5%',
    position:'absolute'
  },
  middle:{
    height:'60%',
    width:'60%',
    marginTop:'5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
  },
  album:{
    height:'40%',
    width:'50%',
    marginTop:'7.5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
    borderRadius:10,
  },
  spotify:{
    height:'100%',
    width:'8%',
    marginTop:'7.5%',
    resizeMode:'contain',
    zIndex:3,
    alignSelf:'center',
    marginLeft:'2%',
  },
  playing:{
      width:'90%',
      height:'70%',
      elevation:1,
      backgroundColor:'#FFF',
      alignSelf:'center',
      marginTop:'15%',
      borderRadius:20
  }
  
});
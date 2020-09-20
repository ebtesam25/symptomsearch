import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import SongList from "../components/songList";
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

let customFonts  = {
  'FuturaH': require('../assets/fonts/futurah.ttf'),
  'FuturaL': require('../assets/fonts/futural.ttf'),
};

export default class Spotify extends React.Component  {
  state = {
    fontsLoaded: false,
    playing: false,
    search: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  
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
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
      <Image source={require('../assets/settings.png')} style={styles.left}></Image>
      <Image source={require('../assets/help.png')} style={styles.right}></Image>
      <View style={styles.playing}>
          {this.state.playing &&
          <View>
            <Text style={{position:'relative',fontSize:20,marginTop:'20%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Currently not playing</Text>
            <Image source={require('../assets/404.png')} style={styles.middle}></Image>
          </View>
    }
    {!this.state.playing &&
          <View>
            <Text style={{position:'relative',fontSize:20,marginTop:'10%',textAlign:'center', color:'#364f6b', fontFamily:'FuturaH'}}>Symptom Lookup</Text>
            <TextInput placeholder="eg. fever" style={{position:'relative',fontSize:20,marginTop:'10%',alignSelf:'center', color:'#364f6b', fontFamily:'FuturaL', borderRadius:10, width:'70%',marginLeft:'-10%', paddingHorizontal:'10%', paddingVertical:'5%', borderColor:'#000', borderStyle:'solid', borderWidth:1}}></TextInput>
            <Icon name="search" onPress={()=>this.setState({search:true})} size={25} style={{position:'absolute', zIndex:5, right:30, top:80, backgroundColor:'#000', padding:'5.75%', borderRadius:10}} color="#FFF"></Icon>
            <View style={{flex:1, flexDirection:'row', marginTop:'25%', alignSelf:'center'}}>
            <Text style={{position:'relative',fontSize:15,marginTop:'2%',textAlign:'center', color:'#FFF', fontFamily:'FuturaH', backgroundColor:'#1F1F1F', marginLeft:'0%',paddingVertical:'2%',paddingHorizontal:'10%', width:'60%',height:50,borderRadius:10}} onPress={()=>this.props.navigation.navigate('Pneu')}>Do I have pneumonia?</Text>
            </View>
          </View>
    }
      </View>
      <Text style={{position:'relative',fontSize:20,marginTop:'10%',marginLeft:'5%', textAlign:'left', color:'#364f6b', fontFamily:'FuturaH'}}>Possible Conditions</Text>
    {this.state.search &&
      <ScrollView style={styles.scrollcontainer}>
      <SongList itemList={this.getData()}/>
      </ScrollView>
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
      width:'70%',
      height:'40%',
      elevation:1,
      backgroundColor:'#FFF',
      alignSelf:'center',
      marginTop:'15%',
      borderRadius:20
  }
  
});
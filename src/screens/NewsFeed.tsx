import axios from "axios";
import React,{ Component } from "react";
import { View,Text,TouchableOpacity,FlatList, StyleSheet, Image } from "react-native";
import { State } from "react-native-gesture-handler";
import Realm from 'realm';
import { FeedSchema } from "../schema/schema";

let realm:any;
realm = new Realm({path:'feed',schema:[FeedSchema]})
const data = realm.objects('Feed')

interface Props{
    
}

class NewsFeed extends Component<State,Props>{

    render(){
        //console.log(realm.objects('Feed'));
        return(
            <View>
                <FlatList
                    data={data}
                    keyExtractor={item=>item.Id}
                    renderItem={({item})=>(
                        <View style={styles.container}>
                            <Text style={{fontSize:22,fontWeight:'bold'}}>{item.Title}</Text>
                            <Image source={{uri:item.UrlToImage}} style={{height:200,width:'100%'}} />
                            <Text style={{fontSize:18,fontWeight:'bold',color:'red'}}>Author :<Text style={{fontWeight:'normal',color:'black'}}>{item.Author}</Text></Text>
                            <Text>{item.Description}</Text>
                            <TouchableOpacity>
                                <Text style={{fontWeight:'bold',color:'blue'}}>{item.url}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        borderBottomWidth:2,
        borderColor:'black',
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:'#d1cdcd'
    }
})

export default NewsFeed;
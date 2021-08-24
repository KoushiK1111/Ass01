import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React,{ Component } from "react";
import axios from 'axios';
import { View,Text,TouchableOpacity,StyleSheet } from "react-native";
import { ParamList } from "../navigation/ParamList";
import Realm from 'realm';
import { FeedSchema } from "../schema/schema";

let realm:any;
realm = new Realm({path:'feed',schema:[FeedSchema]})

interface Props{
    navigation:StackNavigationProp<ParamList,'Home'>
    route:RouteProp<ParamList,'Home'>
}

interface State{
    data:any
}

class Home extends Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        axios.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b6d4ec9069ec4e0c8233e29acfd80594')
        .then(res => {
            let Data = res.data.articles
            this.setState({data:Data})
            //console.log(Data)
        })
        .catch(err=>console.log(err))
    }

    add_feeds = () =>{
        this.state.data.map((feed:any)=>{
            console.log(feed)
           realm.write(()=>{
               const ID = Math.floor(Math.random() * 9999999).toString();
               realm.create('Feed',{
                   Id:ID,
                   Title:feed.title,
                   Description:feed.description,
                   UrlToImage:feed.urlToImage,
                   url:feed.url,
                   Content:feed.content,
                   Author:feed.author
               })
           })
        })
          
       //console.log(realm.objects('Feed'));
    }

    render(){
        console.log(this.props.route.params.Id)
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile',{Id:this.props.route.params.Id})}>
                    <Text style={styles.buttonTextStyle}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.add_feeds}>
                    <Text style={styles.buttonTextStyle}>Get feeds</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('NewsFeed')}>
                    <Text style={styles.buttonTextStyle}>News Feed</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    buttonTextStyle:{
        fontSize:24,
        paddingVertical:20
    }
})

export default Home;
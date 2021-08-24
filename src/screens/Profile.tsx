import { RouteProp } from "@react-navigation/native";
import React,{ Component } from "react";
import { View,Text, StyleSheet } from "react-native";
import { ParamList } from "../navigation/ParamList";
import Realm from 'realm';
import { UserSchema } from "../schema/schema";
import {TextComponent} from '../component'

let realm:any;

interface Props{
    route:RouteProp<ParamList,'Profile'>
}

interface State{
    Email:string,
    First_Name:string,
    Last_Name:string,
    City:string,
    State:string,
    Country:string,
    Phone_Number:string,
    Pincode:string,
}

class Profile extends Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.state={
            First_Name:"",
            Last_Name:"",
            City:"",
            State:"",
            Country:"",
            Phone_Number:"",
            Pincode:"",
            Email:"",
        }
    }

    componentDidMount(){
        realm = new Realm({path:'Users',schema:[UserSchema]});
        realm.write(()=>{
            realm.objects('User_Details').find((user:any)=>{
                if(user.User_Id===this.props.route.params.Id){
                    this.setState({First_Name:user.First_Name});
                    this.setState({Last_Name:user.Last_Name});
                    this.setState({City:user.City});
                    this.setState({Country:user.Country});
                    this.setState({Phone_Number:user.Phone_Number});
                    this.setState({State:user.State});
                    this.setState({Pincode:user.Pincode})
                    this.setState({Email:user.Email});
                }
            })
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.headerTextStyle}>Profile</Text>
                <View style={styles.card}>
                <TextComponent title1="First Name"  title2={this.state.First_Name}/>
                <TextComponent title1="Last Name"  title2={this.state.Last_Name}/>
                <TextComponent title1="Email"  title2={this.state.Email}/>
                <TextComponent title1="City"  title2={this.state.City}/>
                <TextComponent title1="State"  title2={this.state.State}/>
                <TextComponent title1="Country"  title2={this.state.Country}/>
                <TextComponent title1="Phone Number"  title2={this.state.Phone_Number}/>
                <TextComponent title1="Pincode"  title2={this.state.Pincode}/>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#d1cdcd'
    },
    card:{
        borderWidth:2,
        backgroundColor:'#a8a5a5',
        borderColor:'grey',
        elevation:10,
        marginHorizontal:10,
        borderRadius:10
    },
    headerTextStyle:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:32,
        color:'red',
        marginVertical:30,
        borderBottomWidth:2,
    },
    textStyle:{
        fontSize:24,
        marginHorizontal:20,
        marginBottom:10,
        color:'black',
        fontWeight:'bold'
    }
})

export default Profile;
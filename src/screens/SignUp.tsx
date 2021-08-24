import { StackNavigationProp } from "@react-navigation/stack";
import React,{ Component } from "react";
import { Alert, ScrollView,StyleSheet,Text,TextInput,TouchableOpacity, View } from "react-native";
import Realm from 'realm';
import { ParamList } from "../navigation/ParamList";
import { UserSchema } from "../schema/schema";
import axios from 'axios';

let realm:any;
realm = new Realm({path:'Users',schema:[UserSchema]})

interface Props{
    navigation:StackNavigationProp<ParamList,'SignUp'>
};

interface State{
    First_Name:string,
    Last_Name:string,
    Email:string,
    City:string,
    State:string,
    Country:string,
    Pincode:string,
    Phone_Number:string,
    PassWord:string,
    Confirm_Password:string,
    data:any,
};

class SignUp extends Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.state={
            First_Name:"",
            Last_Name:"",
            Email:"",
            City:"",
            State:"",
            Country:"",
            Pincode:"",
            Phone_Number:"",
            PassWord:"",
            Confirm_Password:"",
            data:null,
        }
    }

    

    add_User=()=>{
        if(this.state.First_Name==="" || 
        this.state.Last_Name==="" ||
        this.state.Email==="" ||
        this.state.City==="" ||
        this.state.State===""||
        this.state.Country==="" ||
        this.state.Pincode==="" ||
        this.state.Phone_Number==="" ||
        this.state.PassWord===""){
            Alert.alert('All Text Fields required to fill')
        }else{
            realm.write(()=>{
                const ID = Math.floor(Math.random() * 9999);
                realm.create('User_Details',{
                    User_Id:ID,
                    First_Name:this.state.First_Name,
                    Last_Name:this.state.Last_Name,
                    Email:this.state.Email,
                    City:this.state.City,
                    State:this.state.State,
                    Country:this.state.Country,
                    Pincode:this.state.Pincode,
                    Phone_Number:this.state.Phone_Number,
                    PassWord:this.state.PassWord,
                })
            })
            //console.log(realm.objects('User_Details'))
            this.props.navigation.navigate('LogIn')
        }
    }
    
    render(){
        return(
            <View style = {styles.container}>
                <ScrollView >
                    <Text style={styles.textStyle}>Sign Up</Text>
                    <TextInput
                        style={styles.textInputStyles} 
                        placeholder="Enter Your First Name"
                        value={this.state.First_Name}
                        onChangeText={(text)=>this.setState({First_Name:text})}
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter Your Last Name"
                        value={this.state.Last_Name}
                        onChangeText={(text)=>this.setState({Last_Name:text})}
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter Your Email"
                        value={this.state.Email}
                        onChangeText={(text)=>this.setState({Email:text})}
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter Your Place"
                        value={this.state.City}
                        onChangeText={(text)=>this.setState({City:text})}
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter Your State"
                        value={this.state.State}
                        onChangeText={(text)=>this.setState({State:text})}
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter Your Country"
                        value={this.state.Country}
                        onChangeText={(text)=>this.setState({Country:text})}
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter your Pincode"
                        keyboardType='numeric'
                        value={this.state.Pincode}
                        onChangeText={(text)=>this.setState({Pincode:text})}
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter Your Mobile Number"
                        keyboardType='numeric'
                        value={this.state.Phone_Number}
                        onChangeText={(text)=>this.setState({Phone_Number:text})}
                        
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter Your Password"
                        value={this.state.PassWord}
                        onChangeText={(text)=>this.setState({PassWord:text})}
                        secureTextEntry
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Please Confirm Your Password"
                        value={this.state.Confirm_Password}
                        onChangeText={(text)=>this.setState({Confirm_Password:text})}
                        onEndEditing={()=>{
                            if(this.state.Confirm_Password!==this.state.PassWord){
                                Alert.alert('confirm password correctly')
                            }
                        }}
                    />
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.add_User}>
                        <Text style={styles.ButtonTextStyle}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('LogIn')}>
                        <Text style={{fontSize:18,color:'blue',marginBottom:50,marginTop:20}}>Already have an account? Click Here</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:10,
    },
    textStyle:{
        fontSize:32,
        fontWeight:'bold',
        marginVertical:30,
        color:'red',
        alignSelf:'center'
    },
    textInputStyles:{
        borderWidth:2,
        borderColor:'black',
        borderRadius:10,
        marginVertical:10,
        padding:10,
        backgroundColor:'#e3e3e3',
        fontSize:18
    },
    buttonStyle:{
        height: 40,
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 7,
        marginVertical: 10,
    },
    ButtonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize:18
    }
})

export default SignUp;
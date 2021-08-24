import { StackNavigationProp } from "@react-navigation/stack";
import React,{ Component } from "react";
import { View,Text,ScrollView,TextInput,TouchableOpacity,StyleSheet,Alert } from "react-native";
import Realm from 'realm';
import { ParamList } from "../navigation/ParamList";
import { UserSchema } from "../schema/schema";
let realm:any;
realm = new Realm({path:'Users',schema:[UserSchema]})

interface Props{
    navigation:StackNavigationProp<ParamList,'LogIn'>

};

interface State{
    Email:string,
    PassWord:string,
    notLogged:boolean
};

type User = {
    User_Id:string,
    Email:string,
    PassWord:string
}

class LogIn extends Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.state={
            Email:"",
            PassWord:"",
            notLogged:true
        }
    }
    componentDidMount(){
        console.log(realm.objects('User_Details'))
    }

    Authenticate=()=>{
        realm.write(()=>{
            realm.objects('User_Details').find((user:User)=>{
                if(user.Email===this.state.Email && user.PassWord===this.state.PassWord){
                    this.setState({notLogged:false})
                    this.setState({Email:""})
                    this.setState({PassWord:""})
                    this.props.navigation.navigate('Home',{Id:user.User_Id});
                    

                }
            })
        })
    }

    render(){
        return(
            <View style = {styles.container}>
                <ScrollView >
                    <Text style={styles.textStyle}>Log In</Text>
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter Your Email"
                        value={this.state.Email}
                        onChangeText={(text)=>this.setState({Email:text})}
                    />
                    <TextInput 
                        style={styles.textInputStyles}
                        placeholder="Enter Your Password"
                        value={this.state.PassWord}
                        onChangeText={(text)=>this.setState({PassWord:text})}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.Authenticate}>
                        <Text style={styles.ButtonTextStyle}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}>
                        <Text style={{fontSize:18,color:'blue',marginTop:20}}>Don't have an account? Click Here</Text>
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

export default LogIn;
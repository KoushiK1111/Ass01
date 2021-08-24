import React,{ Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUp,LogIn,Home,Profile,NewsFeed } from '../screens';
import { ParamList } from './ParamList';

const {Navigator,Screen} = createStackNavigator<ParamList>()

class Navigation extends Component{
    render(){
        return(
            <NavigationContainer>
                <Navigator screenOptions={{headerStyle:{backgroundColor:'skyblue'},headerTintColor:'white'}}>
                    <Screen
                        name="LogIn"
                        component={LogIn}
                        options={{
                            header:()=>null
                        }}
                    />
                    <Screen
                        name="SignUp"
                        component={SignUp}
                        options={{
                            header:()=>null
                        }}
                    />
                    <Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerTitleAlign:'center'
                        }}
                    />
                    <Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            headerTitle:()=>null
                        }}
                    />
                    <Screen
                        name="NewsFeed"
                        component={NewsFeed}
                    />
                </Navigator>
            </NavigationContainer>
        );
    }
}

export default Navigation;
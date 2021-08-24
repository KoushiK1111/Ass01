
import React,{ FC } from 'react';
import { Text,StyleSheet, View } from 'react-native';

interface Props{
    title1:string,
    title2:string,
}

const TextComponent:FC<Props> = ({title1,title2}) =>{
    return(
        <View style={{flexDirection:'row',paddingBottom:5}}>
            <Text style={styles.textStyle}>{title1} </Text>
            <Text style={{right:20,fontSize:22,color:'red'}}>:</Text>
            <Text style={styles.text2Style}>{title2}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle:{
        flex:1,
        fontSize:24,
        marginHorizontal:20,
        marginBottom:10,
        color:'black',
        fontWeight:'bold'
    },
    text2Style:{
        flex:1,
        fontWeight:'normal',
        color:'blue',
        fontSize:24,
    }
})

export default TextComponent;
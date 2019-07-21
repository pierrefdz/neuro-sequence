import React from 'react'
import { StyleSheet, Text, View, TextInput , Button,TouchableOpacity, Animated, Easing } from 'react-native'
import Sequence from '../components/Sequence'

class AnswerChoice extends React.Component{
  constructor(props) {
    super(props)
    this.state = { list: ['red','yellow','blue','red','blue','red'] }
  }

  _displayMatrix=() => {console.log("Display Matrix")
    this.props.navigation.navigate("AnswerMatrix")
  }
  _displayTriangle=() => {console.log("Display Triangle")
    this.props.navigation.navigate("AnswerTriangle")
  }

  render(){
        return (
          <View style={{flex:1}}>

            <Animated.View style={{flex:1,justifyContent :'center',alignItems:'center'}}>
              <Button title='Matrix Format' onPress={()=>this._displayMatrix()} color="#138a72"/>
            </Animated.View>
            <Animated.View style={{flex:1,justifyContent :'center',alignItems:'center'}}>
              <Button title='Triangle Format' onPress={()=>this._displayTriangle()} color="#138a72"/>
            </Animated.View>

          </View>
        );
  }
}

export default AnswerChoice

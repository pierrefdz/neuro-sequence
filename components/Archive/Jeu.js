import React from 'react'
import {StyleSheet,View,Text,Button} from 'react-native'


class Jeu extends React.Component{
  _displayAnswerChoice=() => {console.log("Display AnswerChoice")
    this.props.navigation.navigate("AnswerChoice")
  }
  _displaySequenceChoice=() => {console.log("Display SequenceChoice")
    this.props.navigation.navigate("SequenceChoice")
    }

  render(){
      console.log(this.props)
      return(
        <View style={styles.main_container}>
          <View style={{flex:1,justifyContent :'center',alignItems:'center'}}>
            <Button title='Sequence Choice' onPress={()=>this._displaySequenceChoice()} color="#138a72"/>
          </View>
          <View style={{flex:1,justifyContent :'center',alignItems:'center'}}>
            <Button title='Answer Screen Format' onPress={()=>this._displayAnswerChoice()} color="#138a72"/>
          </View>
        </View>
      )
  }
}

const styles=StyleSheet.create({
    main_container:{
        flex:1,
        justifyContent :'center',
        alignItems:'center',
    },
    textStyle: {
        fontSize:30,
        fontWeight:'bold',
    }
})

export default Jeu

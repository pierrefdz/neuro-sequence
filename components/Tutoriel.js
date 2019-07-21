import React from 'react'
import { ScrollView, StyleSheet, View ,Animated,Easing,Button,Text,TouchableOpacity, Image} from 'react-native'
import { connect } from 'react-redux'


class Tutoriel extends React.Component{


    _goBackHome=()=>{
        this._paramChange('tutoLu')

        this.props.navigation.navigate("Accueil")
    }

      _paramChange(type) {
      // const action = { type: 'disp', value: val };
      // this.props.dispatch(action)

      let action
      switch (type) {
        case 'tutoLu':
          action ={type: 'tutoLu' };
          this.props.dispatch(action)
          break;
      }
  }

    render(){
        return(
        <ScrollView style={styles.main_container}>
            <Text style={styles.textStyleM} > Dans ce jeu, une séquence de bulles de couleurs vont vous être présentées. Vous devez la retenir et la reproduire aussi vite que possible </Text>
            <Text style={styles.textStyle}>
            <Text style={styles.textStyle}>Cela commencera par un entraînement avec des séquences de 4 bulles où le score et le highscore ne sont pas décompter, à la fin de celui-ci vous devrez cliquer sur le bouton </Text> <Text style={styles.textStyle}> 'end of training' </Text> <Text style={styles.textStyle}> pour débuter le vrai jeu où on vous présentera 6 bulles. </Text> </Text>
            <Text style={styles.textStyle}>Bonne chance ! </Text>

            <Text style={styles.textStyleM}>
                <Text style={styles.textStyle}>In this game, a sequence of colored bubbles will be flashed on the screen. You ll have to memorize them and reproduice the sequence as fast as you can.</Text>
                <Text style={styles.textStyle}> At first, there will be a training with 4-bubble-long sequences during which your score will not change, then you ll have to click on the button </Text>
                <Text style={styles.textStyle}> "end of training "</Text>
                <Text style={styles.textStyle}> in order to start the real game </Text></Text>
                <Text style={styles.textStyle}>Good luck !</Text>

            <Button title = "I've read it !" onPress={() => this._goBackHome()}/>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {

    flex: 1,
    backgroundColor : "#138a72"
  },
  textStyleM :{
      marginTop :20,
    fontWeight : 'bold',
    fontSize:20,
    color : 'white'
},
    textStyle :{

    fontWeight : 'bold',
    fontSize:20,
    color : 'white'}
})
const mapStateToProps = state => {
  return {

    seqLength : state.paramChange.seqLength,
    tutoLu : state.persistChange.tutoLu
  }
  // return state
}





export default connect(mapStateToProps)(Tutoriel)

import React from 'react'
import { StyleSheet, Text, View, TextInput , Button, ImageBackground, Image, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux'
import {selectSeq} from '../lireJson.js'

class Accueil extends React.Component{

    constructor(props){
        super(props)
    }

    initializeSequence(){
      var seq=selectSeq((this.props.diffSeq%3)+4)
      this._paramChange('list',seq)
    }

  _displayGameScreen=(int) => {console.log("Display Game Screen")
    this._persistChange('nbreGoodAnswer',0)
     this._paramChange('seqLength',int)
     this.initializeSequence()
     this.props.navigation.navigate("Try")
  }

  _displaySequenceChoice=() => {console.log("Display SequenceChoice")
    this.props.navigation.navigate("SequenceChoice")
    }

  _paramChange(type,val) {
      // const action = { type: 'disp', value: val };
      // this.props.dispatch(action)
      let action
      switch (type) {
        case 'seqLength':
          action ={type: 'seqLength', value: val};
          this.props.dispatch(action)
          break;
        case 'list':
          action ={type: 'list', value: val};
          this.props.dispatch(action)
          break;
      }
  }

_persistChange(type,val){
    let action
    switch(type){
            case'ratio':
                action= {type : 'ratio',value : val}
                this.props.dispatch(action)
                break;
        case 'nbreGoodAnswer':
            action= {type : 'nbreGoodAnswer',value : val}
                this.props.dispatch(action)
                break;
    }
}

displayButtonExperimentIf(){
    if(this.props.ratio>0.7){
        return(
            <View>
                <Button style={styles.jouer} title='Play 6' onPress={() => this._displayGameScreen(6)}/>
            </View>
        )
        }
    else{
        return(
            <View>
                <Text> There will be a button here </Text>
            </View>
        )
    }
    }

displayButtonTrainingIf(){
    var {height, width} = Dimensions.get('window');
    if(!this.props.tutoLu){
        return(
          <TouchableOpacity onPress={()=>this._displayTutorial()}>
            <Image source={require('../img/playButtonTutorial.png')} style={{height: width/4, width: width/4}}/>
          </TouchableOpacity>
        )
    }
    else if(this.props.ratio>0.7){
        return(
          <TouchableOpacity onPress={()=>this._displayGameScreen(6)}>
            <Image source={require('../img/playButton.png')} style={{height: width/4, width: width/4}}/>
          </TouchableOpacity>
        )
    }
    // else if(this.props.ratio>0.7){
    //     return(
    //         <View>
    //             <Button style={styles.jouer} title='Play 6' onPress={() => this._displayGameScreen(6)}/>
    //         </View>
    //     )
    // }
    else if(this.props.ratio<=0.7){
      return(
        <TouchableOpacity onPress={()=>this._displayGameScreen(4)}>
          <Image source={require('../img/playButton.png')} style={{height: width/4, width: width/4}}/>
        </TouchableOpacity>
      )
    }
}

_displayTutorial(){
    this.props.navigation.navigate("Tutoriel")
}


  render() {


    return (
      <ImageBackground style={styles.main_container} source={require('../img/welcomePage.png')}>

        <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
         {this.displayButtonTrainingIf()}
        </View>

      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor : "#191970"
  },
  text_welcome: {
    fontWeight:'bold',
    fontSize:40,
    marginLeft: 5,
    marginRight: 5,
  },
  jouer: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
})

const mapStateToProps = state => {
  return {
    lits: state.paramChange.list,
    diffSeq: state.paramChange.diffSeq,
    seqLength : state.paramChange.seqLength,
    tutoLu : state.persistChange.tutoLu,
    ratio : state.persistChange.ratio,
    nbreGoodAnswer : state.persistChange.nbreGoodAnswer,
  }
  // return state
}





export default connect(mapStateToProps)(Accueil)

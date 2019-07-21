import React from 'react'
import {StyleSheet,View,Text,Button,Image,Dimensions, ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import {selectSeq} from '../lireJson.js'
//import SoundPlayer from 'react-native-sound-player'

class Result extends React.Component{

constructor(props){
        super(props)
        this.nbSeq = this.props.nbSeq
        this.diffSeq = this.props.diffSeq
        this.list = this.props.list
        this.answerList = this.props.answerList
        this.time= this.props.time

    }

    createURL() {
      var url='https://neuropolytech.unicog.org/neurosequence.php?';

      //création séquence
      url=url+'sequence=[';
      for(var i= 0; i < this.list.length; i++){
        url=url+this.list[i]+',';
      }
      url=url+']';

      //création answerlist
      url=url+'&reponse=[';
      for(var i= 0; i < this.answerList.length; i++){
        url=url+this.answerList[i]+',';
      }
      url=url+']';
      //
      //création answerlist
      url=url+'&temps_reponse=[';
      for(var i= 0; i < this.time.length; i++){
        url=url+this.time[i]+',';
      }
      url=url+']';

      console.log(url);
      return url;
    }

componentWillMount() {
  if(this.compareSequence(this.list,this.answerList)){
    this._persistChange('seqGoodAnswers',this.props.seqGoodAnswers+1)
    if(this.props.seqGoodAnswers >= this.props.bestScore){

        if(this.props.seqLength ==6){
            this._persistChange('bestScore',this.props.seqGoodAnswers+1)
            }}
  }
  else {
    this._persistChange('seqGoodAnswers', 0)
  }

  fetch(this.createURL(), {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answerList : this.answerList,
        list : this.list,
        time: this.time,
      }),
    });

 }


compareSequence(tab1,tab2){
    var cst=0;

        for( var i =0 ; i<this.props.seqLength ; i++ ){
            if(tab1[i]==tab2[i]) cst++;

    }

    return cst==this.props.seqLength;
}

nbreBonneRep(tab1,tab2){
    var cst=0;
        for( var i =0 ; i<this.props.seqLength ; i++ ){
            if(tab1[i]==tab2[i]) cst++;
    }

    return cst;
}

score(tab1,tab2){

  var cst=0;

        for( var i =0 ; i<this.props.seqLength ; i++ ){
            if(tab1[i]==tab2[i]) cst++;

    }
    return Math.floor(60*cst/((this.time[this.props.seqLength-1]-this.time[0])/1000));
}


afficheRes(){

    if(this.compareSequence(this.list,this.answerList)){
        //SoundPlayer.playSoundFile('good_answer', 'mp3')
        return(
        <View style={{justifyContent:'center'}}>
            <Text style={styles.text}> {this.props.seqGoodAnswers} Bonnes réponses de suite ! </Text>
            <Text style ={styles.text}> Précédent Meilleur Score : {this.props.bestScore } </Text>
        </View>
        )
    }
    else {
        //SoundPlayer.playSoundFile('bad_answer', 'mp3')
        return(
        <View>
            <Text style={styles.text}> Try again ... </Text>
            <Text style ={styles.text}>Précédent Meilleur Score : {this.props.bestScore } </Text>
        </View>
        )
    }
}

initializeSequence(){
  var seq=selectSeq((this.props.diffSeq%3)+4)
  this._paramChange('list',seq)
}

playAgain(){

    var val = this.nbreBonneRep(this.list,this.answerList)
    this._persistChange('nbreGoodAnswer',this.props.nbreGoodAnswer+val)
    this._paramChange('diffSeq',0)
    this._paramChange('nbSeq', this.nbSeq+1)
    this._paramChange('answersComplete',false)
    this._paramChange('answerList',false)
    this.initializeSequence()
    this.props.navigation.navigate("Try")
}

retourAccueil(){
    var val = this.nbreBonneRep(this.list,this.answerList)
    this._persistChange('nbreGoodAnswer',this.props.nbreGoodAnswer+val)

    this._paramChange('answersComplete',0);
    this._paramChange('nbSeq',1)
    this.props.navigation.navigate("Accueil")
}

_boutonAccueil(){
    if(this.props.seqLength===4 && this.props.ratio>0.7){
        return(
            <View style={{flex :1 , justifyContent: 'center',alignItems :'center'}}>
                <Button title="End of training" onPress={()=>this.retourAccueil()}/>
            </View>
        )
}
    else{
    return(
        <View style={{flex :1 , justifyContent: 'center',alignItems :'center'}}>
            <Button title='Go back to the welcome page' onPress={()=>this.retourAccueil()}/>
        </View>
    )
}

}


_paramChange(type,val) {
    // const action = { type: 'disp', value: val };
    // this.props.dispatch(action)
    let action
    switch (type) {
      case 'diffSeq':
        action ={type: 'diffSeq', value: 1};
        this.props.dispatch(action)
        break;
      case 'nbSeq':
        action ={type: 'nbSeq', value: val};
        this.props.dispatch(action)
        break;
      case 'answersComplete':
        action ={type: 'answersComplete', value: false};
        this.props.dispatch(action)
        break;
      case 'answerList':
        action ={type: 'answerList', value: ['','','','','','']};
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
    switch (type) {
        case 'nbreGoodAnswer':
        action ={type: 'nbreGoodAnswer',value: val};
        this.props.dispatch(action)
        break;
      case 'seqGoodAnswers':
        action ={type: 'seqGoodAnswers',value: val};
        this.props.dispatch(action)
        break;
      case 'ratio':
        action ={type: 'ratio',value: val};
        this.props.dispatch(action)
        break;
      case 'bestScore':
        action ={type: 'bestScore',value: val};
        this.props.dispatch(action)
        break;

}
}

afficheSequence(){

    if(this.props.seqLength==4){


    return(

        <View style={{flex:1 ,flexDirection : 'row',alignItems:'center',justifyContent:'space-around'}} >
                <View style={{flex:1,alignItems:'center'}}>

                  {this._displayCircle(0,this.props.list)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(1,this.props.list)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(2,this.props.list)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(3,this.props.list)}
                </View>

        </View>


    )}
    else{
        return(

        <View style={{flex:1 ,flexDirection : 'row',alignItems:'center',justifyContent:'space-around'}} >
                <View style={{flex:1,alignItems:'center'}}>

                  {this._displayCircle(0,this.props.list)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(1,this.props.list)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(2,this.props.list)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(3,this.props.list)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(4,this.props.list)}
                </View><View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(5,this.props.list)}
                </View>

        </View>


    )

    }
}

afficheRep(){

    if(this.props.seqLength==4){
    return(

        <View style={{flex:1 ,flexDirection : 'row',alignItems:'center',justifyContent:'space-around'}} >
                <View style={{flex:1,alignItems:'center'}}>

                  {this._displayCircle(0,this.props.answerList)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(1,this.props.answerList)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(2,this.props.answerList)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(3,this.props.answerList)}
                </View>

        </View>


    )}
    else{
        return(
        <View style={{flex:1 ,flexDirection : 'row',alignItems:'center',justifyContent:'space-around'}} >
                <View style={{flex:1,alignItems:'center'}}>

                  {this._displayCircle(0,this.props.answerList)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(1,this.props.answerList)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(2,this.props.answerList)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(3,this.props.answerList)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(4,this.props.answerList)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(5,this.props.answerList)}
                </View>
        </View>
        )
    }
}

boutonPlayAgain(){
    if(this.props.seqLength===4 && this.props.ratio>0.7){

}
    else{
        return (
            <View style={{flex:3,justifyContent:'center'}}>
                <Button title='Play Again' onPress={()=>this.playAgain()}/>
            </View>
        )
    }
}

_displayCircle = (int,list)=>{

    switch(list[int]){
        case 'yellow':

                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'yellow',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )


            break;
        case 'red':


                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'red',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )

            break;
        case 'blue' :

                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'blue',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )


            break;

    }
}


 render() {
     console.log(this.props.bestScore)
        return(
        <ImageBackground style={styles.main_container} source={require('../img/backgroundPageBis.png')}>
            <View style={{flex:1,justifyContent:'flex-end'}}>
                <Text> La reponse  </Text>
            </View>

            <View style={{flex:3,flexDirection:'row'}}>

                {this.afficheSequence()}
            </View>
            <View>
                <Text> Ta proposition </Text>
            </View>
            <View style={{flex:3,flexDirection:'row'}}>

                {this.afficheRep()}
            </View>

            <View style={{flex:3,justifyContent:'center'}}>
                {this.afficheRes()}
            </View>

            <View style={{flex:3,justifyContent:'center'}}>
                {this.boutonPlayAgain()}
            </View>
            <View style = {{flex:3,justifyContent:'center',alignItems:'center'}}>
                {this._boutonAccueil()}
            </View>

        </ImageBackground>
    )
    }
}

const styles=StyleSheet.create({
    main_container:{
        flex:1,
        justifyContent :'center',
        alignItems:'center',
    },
    text: {
        fontSize:20,
        fontWeight:'bold',
        justifyContent:'flex-end'
    },
    red: {height:50,width:50,backgroundColor:'red',borderRadius: 50/2},
    yellow: {height:50,width:50,backgroundColor:'yellow',borderRadius:50/2},
    blue:{height:50,width:50,backgroundColor:'blue',borderRadius:50/2}
})

const window = Dimensions.get('window')
const mapStateToProps = state => {
  return {
    list: state.paramChange.list,
    diffSeq: state.paramChange.diffSeq,
    nbSeq: state.paramChange.nbSeq,
    answerList: state.paramChange.answerList,
    score : state.paramChange.score,
    time : state.paramChange.time,
    seqLength : state.paramChange.seqLength,
    nbreGoodAnswer : state.persistChange.nbreGoodAnswer,
    seqGoodAnswers : state.persistChange.seqGoodAnswers,
    ratio : state.persistChange.ratio,
    bestScore : state.persistChange.bestScore,
  }
  // return state
}

export default connect(mapStateToProps)(Result)

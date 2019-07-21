import React from 'react'
import { StyleSheet, View, Animated, Easing, Image, Dimensions, ImageBackground } from 'react-native'
import MatrixTimo from'../components/MatrixTimo'
import { connect } from 'react-redux'


class Try extends React.Component {

  constructor(props) {
      super(props)

      this.state = {
        dureeApparition:this.props.dureeApparition,
        dureeDisparition:this.props.dureeDisparition,
        dureeEntre:this.props.dureeEntre,
        dureeReste:this.props.dureeReste,
        list:this.props.list,
        answerList: this.props.answerList,
        viewSizeRed: new Animated.Value(0),
        viewOpacityMatrix: new Animated.Value(0),
        viewHeightMatrix: new Animated.Value(0),
        viewSizeYellow: new Animated.Value(0),
        viewSizeBlue:new Animated.Value(0),
        noViewDelay: new Animated.Value(0),
      }
    }

  animDelay(delay){
    return([
    Animated.timing(
      this.state.noViewDelay,
      {
        toValue:1,
        duration: delay,
      }
    )
    ])
  }

  animRed(){
    return([
    Animated.timing(
      this.state.viewSizeRed,
      {
        toValue: 150,
        duration: this.state.dureeApparition,
        easing: Easing.linear,
      }
    ),
    Animated.timing(
      this.state.viewSizeRed,
      {
        toValue: 150,
        duration: this.state.dureeReste,
        easing: Easing.linear,
      }
    ),
    Animated.timing(
      this.state.viewSizeRed,
      {
        toValue: 0,
        duration: this.state.dureeDisparition,
        easing: Easing.quad,
      }
    )]
    )
  }

  animBlue(){
    return([
    Animated.timing(
      this.state.viewSizeBlue,
      {
        delay:50,
        toValue: 150,
        duration: this.state.dureeApparition,
        easing: Easing.linear,
      }
    ),
    Animated.timing(
      this.state.viewSizeBlue,
      {
        toValue: 150,
        duration: this.state.dureeReste,
        easing: Easing.linear,
      }
    ),
    Animated.timing(
      this.state.viewSizeBlue,
      {
        toValue: 0,
        duration:  this.state.dureeDisparition,
        easing: Easing.quad,
      }
    )]
    )
  }

  animYellow(){
    return([
    Animated.timing(
      this.state.viewSizeYellow,
      {
        delay:50,
        toValue: 150,
        duration: this.state.dureeApparition,
        easing: Easing.linear,
      }
    ),
    Animated.timing(
      this.state.viewSizeYellow,
      {
        toValue: 150,
        duration: this.state.dureeReste,
        easing: Easing.linear,
      }
    ),
    Animated.timing(
      this.state.viewSizeYellow,
      {
        toValue: 0,
        duration: this.state.dureeDisparition,
        easing: Easing.quad,
      }
    )]
    )
  }

  animMatrix(){
    return([
    Animated.timing(
      this.state.viewHeightMatrix,
      {
        toValue: Dimensions.get('window').height,
        duration: this.state.dureeApparition,
        easing: Easing.linear,
      }
    ),
    Animated.timing(
      this.state.viewOpacityMatrix,
      {
        toValue: 1,
        duration: this.state.dureeApparition,
        easing: Easing.linear,
      }
    )
  ])
  }

  anim(){
    var tmp=this.animDelay(500);
    for(var i=0;i<this.props.seqLength;i++){
      if(this.state.list[i]=='red') tmp=tmp.concat(this.animRed());
      if(this.state.list[i]=='blue') tmp=tmp.concat(this.animBlue());
      if(this.state.list[i]=='yellow') tmp=tmp.concat(this.animYellow());
      tmp=tmp.concat(this.animDelay(this.state.dureeEntre))
    }
    tmp=tmp.concat(this.animMatrix());
    return Animated.sequence(tmp)
  }

  displayResultIf(){
      if(this.props.answersComplete){
          var val = this.props.nbSeq;
          if(this.props.seqLength==4&&val>1){
            this._persistChange("ratio",this.props.nbreGoodAnswer/(4*(val-1)))}
          this.props.navigation.navigate("Result")
      }
  }

  componentDidMount () {
    this.anim().start()
  }

  componentDidUpdate(){
      this.displayResultIf()
  }

  _paramChange(type,seq) {
      // const action = { type: 'disp', value: val };
      // this.props.dispatch(action)
      let action
      switch (type) {
        case 'list':
          action ={type: 'list', value: seq};
          this.props.dispatch(action)
          break;
        case'ratio':
          action ={type: 'ratio', value: seq};
          this.props.dispatch(action)
          break;
      }
  }

    _persistChange(type,seq){
              let action
      switch (type) {
                case'ratio':
          action ={type: 'ratio', value: seq};
          this.props.dispatch(action)
          break;
      }
    }

  render() {
      return (
        <ImageBackground style={styles.main_container} source={require('../img/backgroundPageBis.png')}>
          <Animated.Image style={[styles.animation_view_yellow, { width: this.state.viewSizeYellow,height:this.state.viewSizeYellow}]} source={require('../img/bubbleBis.png')}>
          </Animated.Image>
          <Animated.Image style={[styles.animation_view_red, { width: this.state.viewSizeRed,height:this.state.viewSizeRed}]} source={require('../img/bubbleBis.png')}>
          </Animated.Image>
          <Animated.Image style={[styles.animation_view_blue, { width: this.state.viewSizeBlue,height:this.state.viewSizeBlue}]} source={require('../img/bubbleBis.png')}>
          </Animated.Image>
          <Animated.View style={{ opacity: this.state.viewOpacityMatrix , height: this.state.viewHeightMatrix, width: Dimensions.get('window').width*0.9}}>
            <MatrixTimo/>
          </Animated.View>
        </ImageBackground>
      )
 }

}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation_view_red: {
    backgroundColor:'red',
    borderRadius:150/2
  },
  animation_view_yellow: {
    backgroundColor:'yellow',
    borderRadius:150/2
  },
  animation_view_blue: {
    backgroundColor:'blue',
    borderRadius:150/2
  },
})

const mapStateToProps = state => {
  return {
    dureeApparition: state.paramChange.dureeApparition,
    dureeDisparition: state.paramChange.dureeDisparition,
    dureeEntre: state.paramChange.dureeEntre,
    dureeReste: state.paramChange.dureeReste,
    list: state.paramChange.list,
    answerList: state.paramChange.answerList,
    answersComplete: state.paramChange.answersComplete,
    diffSeq: state.paramChange.diffSeq,
    seqLength : state.paramChange.seqLength,
    ratio: state.persistChange.ratio,
    nbreGoodAnswer : state.persistChange.nbreGoodAnswer,
    nbSeq: state.paramChange.nbSeq,
  }
  // return state
}

export default connect(mapStateToProps)(Try)

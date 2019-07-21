import React from 'react'
import { StyleSheet, View, Animated, Easing, Image } from 'react-native'

class Sequence extends React.Component {

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

  anim(){
    var tmp=this.animDelay(500);
    for(var i=0;i<this.state.list.length;i++){
      if(this.state.list[i]=='red') tmp=tmp.concat(this.animRed());
      if(this.state.list[i]=='blue') tmp=tmp.concat(this.animBlue());
      if(this.state.list[i]=='yellow') tmp=tmp.concat(this.animYellow());
      tmp=tmp.concat(this.animDelay(this.state.dureeEntre))
    }
    return Animated.sequence(tmp)
  }

  componentDidMount () {
      this.anim().start()
  }

  constructor(props) {
    super(props)
    this.state = {
      dureeApparition:this.props.navigation.getParam('dureeApparition'),
      dureeDisparition:this.props.navigation.getParam('dureeDisparition'),
      dureeEntre:this.props.navigation.getParam('dureeEntre'),
      dureeReste:this.props.navigation.getParam('dureeReste'),
      viewSizeRed: new Animated.Value(0),
      viewSizeYellow: new Animated.Value(0),
      viewSizeBlue:new Animated.Value(0),
      noViewDelay: new Animated.Value(0),
      list:this.props.navigation.getParam('list'),
    }
  }

  render() {
      return (
        <View style={styles.main_container}>
          <Animated.Image style={[styles.animation_view_yellow, { width: this.state.viewSizeYellow,height:this.state.viewSizeYellow}]} source={require('../img/bubbleBis.png')}>
          </Animated.Image>
          <Animated.Image style={[styles.animation_view_red, { width: this.state.viewSizeRed,height:this.state.viewSizeRed}]} source={require('../img/bubbleBis.png')}>
          </Animated.Image>
          <Animated.Image style={[styles.animation_view_blue, { width: this.state.viewSizeBlue,height:this.state.viewSizeBlue}]} source={require('../img/bubbleBis.png')}>
          </Animated.Image>
        </View>
      )
 }

}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

export default Sequence

import React from 'react'
import { StyleSheet, View, Animated, Easing } from 'react-native'

class RondRouge extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      color:'red',
    }
  }

  render() {
   return (
     <View style={styles.main_container}>
       <Animated.View style={[styles.animation_view, { width: this.state.viewSize,height:this.state.viewSize, backgroundColor:this.state.color}]}>
       </Animated.View>
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
  animation_view: {
    borderRadius:150/2,
    color:this.state.color
  }
})

export default RondRouge

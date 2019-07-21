import React from 'react'
import { View, Text, Button} from 'react-native'
// import { Slider } from 'react-native-elements'
import { connect } from 'react-redux'


class SequenceChoice extends React.Component {

  // _displaySequence=() => {
  //   var colorList= ['red','yellow','blue'];
  //   var tmp=[];
  //   for (var i=0;i<6;i++){
  //     tmp=tmp.concat([colorList[Math.floor(Math.random() * colorList.length)]]);
  //   }
  //   this.props.navigation.navigate("Sequence", {list:tmp,dureeApparition:this.state.dureeApparition,dureeReste:this.state.dureeReste, dureeDisparition:this.state.dureeDisparition, dureeEntre:this.state.dureeEntre});
  // }
  //
  // _displayTry=() => {
  //   var colorList= ['red','yellow','blue'];
  //   var tmp=[];
  //   for (var i=0;i<6;i++){
  //     tmp=tmp.concat([colorList[Math.floor(Math.random() * colorList.length)]]);
  //   }
  //   this.props.navigation.navigate("Try", {list:tmp,dureeApparition:this.props.dureeApparition,dureeReste:this.props.dureeReste, dureeDisparition:this.props.dureeDisparition, dureeEntre:this.props.dureeEntre});
  // }

  constructor(props) {
    super(props)
  }

  retourAccueil(){
      this.props.navigation.navigate("Accueil")
  }

  _paramChange(type,val) {
      // const action = { type: 'disp', value: val };
      // this.props.dispatch(action)
      let action
      switch (type) {
        case 'appa':
          action ={type: 'appa', value: val};
          this.props.dispatch(action)
          break;
        case 'rest':
          action ={type: 'rest', value: val};
          this.props.dispatch(action)
          break;
        case 'disp':
          action ={type: 'disp', value: val};
          this.props.dispatch(action)
          break;
        case 'entr':
          action ={type: 'entr', value: val};
          this.props.dispatch(action)
          break;
      }
  }

  render() {
      console.log(this.props)
      return (
      <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>

        <View style={{flex: 4, justifyContent: 'center', alignItems:'center'}}>

            <Slider
              width={300}
              step={10}
              minimumValue={10}
              maximumValue={1000}
              value={this.props.dureeApparition}
              onValueChange={val => this._paramChange('appa',val)}/>
            <Text>Displaying Time : {this.props.dureeApparition} ms </Text>

            <Slider
              width={300}
              step={10}
              minimumValue={10}
              maximumValue={1000}
              value={this.props.dureeDisparition}
              onValueChange={val => this._paramChange('disp',val)}/>
            <Text>Vanishing Time : {this.props.dureeDisparition} ms </Text>

            <Slider
              width={300}
              step={10}
              minimumValue={10}
              maximumValue={1000}
              value={this.props.dureeEntre}
              onValueChange={val => this._paramChange('entr',val)}/>
            <Text>Time Between : {this.props.dureeEntre} ms </Text>

            <Slider
              width={300}
              step={10}
              minimumValue={10}
              maximumValue={1000}
              value={this.props.dureeReste}
              onValueChange={val => this._paramChange('rest',val)}/>
            <Text>Time Stay : {this.props.dureeReste} ms </Text>

            <Button title='Go back to the welcome page' onPress={()=>this.retourAccueil()}/>


        </View>

      </View>

      )
 }

}


const mapStateToProps = state => {
  return {
    dureeApparition: state.dureeApparition,
    dureeDisparition: state.dureeDisparition,
    dureeEntre: state.dureeEntre,
    dureeReste: state.dureeReste,
  }
  // return state
}

export default connect(mapStateToProps)(SequenceChoice)
// export default SequenceChoice

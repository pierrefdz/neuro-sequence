import React from 'react'
import { StyleSheet, View ,Animated,Easing,Button,Text,TouchableOpacity, Image,Dimensions} from 'react-native'
import { connect } from 'react-redux'

class AnswerMatrix extends React.Component {

constructor(props) {

    super(props)
    this.allColors = new Array('red','red','red','red','red','red','blue','blue','blue','blue','blue','blue','yellow','yellow','yellow','yellow','yellow','yellow')
    this.couleur=this.shuffle(this.allColors)
    this.t = new Date();
    this.pressed=new Array([false,false,false,false,false,false],[false,false,false,false,false,false,],[false,false,false,false,false,false])
    this.times= [this.t,this.t,this.t,this.t,this.t,this.t]
    this.state={
        i:0,
        yellow: new Array([false,false,false,false,false,false]),
        red: [false,false,false,false,false,false],
        blue: [false,false,false,false,false,false],

        JauneUn:false,
        JauneDeux:false,
        JauneTrois:false,
        JauneQuatre:false,
        JauneCinq:false,
        JauneSix:false,

        BleuUn:false,
        BleuDeux:false,
        BleuTrois:false,
        BleuQuatre:false,
        BleuCinq:false,
        BleuSix:false,

        RougeUn:false,
        RougeDeux:false,
        RougeTrois:false,
        RougeQuatre:false,
        RougeCinq:false,
        RougeSix:false,

        answer:['','','','','',''],
    }

  }

_paramChange(type) {
    // const action = { type: 'disp', value: val };
    // this.props.dispatch(action)
    let action
    switch (type) {
      case 'answersComplete':
        action ={type: 'answersComplete', value: true};
        this.props.dispatch(action)
        break;
      case 'answerList':
        action ={type: 'answerList', value: this.state.answer};
        this.props.dispatch(action)
        break;
      case 'time':
        action = {type : 'time', value : this.times};
        this.props.dispatch(action)
        break;
    }
}


componentDidMount =() =>{
    this.t = new Date()
    this.times= [this.t,this.t,this.t,this.t,this.t,this.t]
}

componentDidUpdate(){
    this.updateIf()
}

updateIf(){
    if(this.state.i==this.props.seqLength){
        this._paramChange('answerList',this.state.answer)
        this._paramChange('answersComplete',true)
        this._paramChange('time',this.times)
    }
}

initialize(){
  this.allColors = new Array('red','red','red','red','red','red','blue','blue','blue','blue','blue','blue','yellow','yellow','yellow','yellow','yellow','yellow')
  this.couleur=this.shuffle(this.allColors)
  this.t = new Date();
  this.pressed=new Array([false,false,false,false,false,false],[false,false,false,false,false,false,],[false,false,false,false,false,false])
  this.times= [this.t,this.t,this.t,this.t,this.t,this.t]
  this.setState({
    i:0,
    yellow: new Array([false,false,false,false,false,false]),
    red: [false,false,false,false,false,false],
    blue: [false,false,false,false,false,false],

    JauneUn:false,
    JauneDeux:false,
    JauneTrois:false,
    JauneQuatre:false,
    JauneCinq:false,
    JauneSix:false,

    BleuUn:false,
    BleuDeux:false,
    BleuTrois:false,
    BleuQuatre:false,
    BleuCinq:false,
    BleuSix:false,

    RougeUn:false,
    RougeDeux:false,
    RougeTrois:false,
    RougeQuatre:false,
    RougeCinq:false,
    RougeSix:false,

    answer:['','','','','',''],
  })
}

coordinatesDisplay=(text,x,y)=>{
  switch(text){
    case 'red':
      if(!this.pressed[x][y]){
        return(
          <TouchableOpacity style={{height:window.width/(1.25*this.props.list.length),width:window.width/(1.25*this.props.list.length),backgroundColor:'red',borderRadius: window.width/(2.5*this.props.list.length)}} onPress={()=>this._affiche(text,x,y)}>
            <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.list.length),width:window.width/(1.25*this.props.list.length),backgroundColor:'red',borderRadius: window.width/(2.5*this.props.list.length)}}/>
          </TouchableOpacity>
        )
      }
      else{
        return(
          <View style={{height:window.width/(1.25*this.props.list.length),width:window.width/(1.25*this.props.list.length)}}>
          </View>
        )
      }
      break;
    case 'blue':
      if(!this.pressed[x][y]){
        return(
          <TouchableOpacity style={{height:window.width/(1.25*this.props.list.length),width:window.width/(1.25*this.props.list.length),backgroundColor:'blue',borderRadius: window.width/(2.5*this.props.list.length)}} onPress={()=>this._affiche(text,x,y)}>
            <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.list.length),width:window.width/(1.25*this.props.list.length),backgroundColor:'blue',borderRadius: window.width/(2.5*this.props.list.length)}}/>
          </TouchableOpacity>
        )
      }
      else{
          return(
            <View style={{height:window.width/(1.25*this.props.list.length),width:window.width/(1.25*this.props.list.length)}}>
            </View>
          )
      }
      break;
    case 'yellow':
      if(!this.pressed[x][y]){
        return(
          <TouchableOpacity style={{height:window.width/(1.25*this.props.list.length),width:window.width/(1.25*this.props.list.length),backgroundColor:'yellow',borderRadius: window.width/(2.5*this.props.list.length)}} onPress={()=>this._affiche(text,x,y)}>
            <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.list.length),width:window.width/(1.25*this.props.list.length),backgroundColor:'yellow',borderRadius: window.width/(2.5*this.props.list.length)}}/>
          </TouchableOpacity>
        )
      }
      else{
        return(
          <View style={{height:window.width/(1.25*this.props.list.length),width:window.width/(1.25*this.props.list.length)}}>
          </View>
        )
      }
      break;
  }
}

  _displayCircle = (int)=>{
    switch(int){
        case 1:
            if(this.state.JauneUn){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'yellow',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            if(this.state.BleuUn){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'blue',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
                }
            if(this.state.RougeUn){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'red',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            break;
        case 2:
            if(this.state.JauneDeux){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'yellow',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            if(this.state.BleuDeux){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'blue',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            if(this.state.RougeDeux){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'red',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            break;
        case 3 :
            if(this.state.JauneTrois){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'yellow',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            if(this.state.BleuTrois){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'blue',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
                }
            if(this.state.RougeTrois){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'red',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            break;
        case 4 :
            if(this.state.JauneQuatre){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'yellow',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            if(this.state.BleuQuatre){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'blue',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
                }
            if(this.state.RougeQuatre){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'red',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            break;
        case 5 :
            if(this.state.JauneCinq){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'yellow',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            if(this.state.BleuCinq){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'blue',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
                }
            if(this.state.RougeCinq){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'red',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            break;
        case 6 :
            if(this.state.JauneSix){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'yellow',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            if(this.state.BleuSix){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'blue',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
                }
            if(this.state.RougeSix){
                return(
                <Image source={require('../img/bubbleBis.png')} style={{height:window.width/(1.25*this.props.seqLength),width:window.width/(1.25*this.props.seqLength),backgroundColor:'red',borderRadius: window.width/(2.5*this.props.seqLength)}}>
                </Image>
                )
            }
            break;

    }
}

  _affiche = (text,x,y)=>{
    var tmp;
    switch(text){
        case 'red':
          switch(this.state.i){
            case 0:
                tmp = this.state.answer;
                tmp[0]='red';
                this.setState({RougeUn: true,
                   i : this.state.i +1,answer: tmp
                   })
                this.pressed[x][y]=true
                this.times[0]= new Date()-this.t
                break;
            case 1:
                tmp = this.state.answer;
                tmp[1]='red';
                this.setState({RougeDeux:true,
                  i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[1]= new Date()-this.t
                break;
            case 2:
                tmp = this.state.answer;
                tmp[2]='red';
                this.setState({RougeTrois:true,
                  i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[2]= new Date()-this.t
                break;
            case 3:
                tmp = this.state.answer;
                tmp[3]='red';
                this.setState({RougeQuatre:true,
                  i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[3]= new Date()-this.t
                break;
            case 4:
                tmp = this.state.answer;
                tmp[4]='red';
                this.setState({RougeCinq:true,
                  i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[4]= new Date()-this.t
                break;
            case 5:
                tmp = this.state.answer;
                tmp[5]='red';
                this.setState({RougeSix:true,
                  i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[5]= new Date()-this.t
                break;
          }
          break;
        case 'blue':
          switch(this.state.i){
            case 0:
                tmp = this.state.answer;
                tmp[0]='blue';
                this.setState({BleuUn: true,
                               i : this.state.i +1,answer: tmp
                     })
                this.pressed[x][y]=true
                this.times[0]= new Date()-this.t
                break;
            case 1:
                tmp = this.state.answer;
                tmp[1]='blue';
                this.setState({BleuDeux:true,
                              i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[1]= new Date()-this.t
                break;
            case 2:
                tmp = this.state.answer;
                tmp[2]='blue';
                this.setState({BleuTrois:true,
                              i:this.state.i+1,answer: tmp})

                this.pressed[x][y]=true
                this.times[2]= new Date()-this.t
                break;
            case 3:
                tmp = this.state.answer;
                tmp[3]='blue';
                this.setState({BleuQuatre:true,
                              i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[3]= new Date()-this.t
                break;
            case 4:
                tmp = this.state.answer;
                tmp[4]='blue';
                this.setState({BleuCinq:true,
                              i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[4]= new Date()-this.t
                break;
            case 5:
                tmp = this.state.answer;
                tmp[5]='blue';
                this.setState({BleuSix:true,
                              i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[5]= new Date()-this.t
                break;
          }
          break;
        case 'yellow':

                  switch(this.state.i){
          case 0:
                tmp = this.state.answer;
                tmp[0]='yellow';
                this.setState({JauneUn: true,
                               i : this.state.i +1,answer: tmp
                     })
                this.pressed[x][y]=true
                this.times[0]= new Date()-this.t
                break;
          case 1:
                tmp = this.state.answer;
                tmp[1]='yellow';
                this.setState({JauneDeux:true,
                              i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[1]= new Date()-this.t
                break;
          case 2:
                tmp = this.state.answer;
                tmp[2]='yellow';
                this.setState({JauneTrois:true,
                              i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[2]= new Date()-this.t
                break;
          case 3:
                tmp = this.state.answer;
                tmp[3]='yellow';
                this.setState({JauneQuatre:true,
                              i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[3]= new Date()-this.t
                break;
          case 4:
                tmp = this.state.answer;
                tmp[4]='yellow';
                this.setState({JauneCinq:true,
                              i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[4]= new Date()-this.t
                break;

          case 5:
                tmp = this.state.answer;
                tmp[5]='yellow';
                this.setState({JauneSix:true,
                              i:this.state.i+1,answer: tmp})
                this.pressed[x][y]=true
                this.times[5]= new Date()-this.t
                break;

  } break;
    }
}

  shuffle = (a)=> {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

  afficheReponse(int){
      switch(int){
          case 4:
              return(
              <View style={{flex:2 ,flexDirection : 'row',alignItems:'center',justifyContent:'space-around'}} >
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(1)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(2)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(3)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(4)}
                </View>
            </View>
            )
            break;

        case 6:
            return(
            <View style={{flex:2 ,flexDirection : 'row',alignItems:'center',justifyContent:'space-around'}} >
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(1)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(2)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(3)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(4)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(5)}
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  {this._displayCircle(6)}
                </View>
            </View>
            )
            break;

      }

  }

  render(){
    return(
            <View style={{flex:1,justifyContent:'space-around'}}>

              <View style={{flex:2 ,flexDirection : 'row',alignItems:'center',justifyContent:'space-around'}}>
                {this.afficheReponse(this.props.seqLength)}
              </View>

              <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>

                  <View>
                      {this.coordinatesDisplay(this.couleur[0],0,0)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[1],0,1)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[2],0,2)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[3],0,3)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[4],0,4)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[5],0,5)}
                  </View>

              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>

                  <View>
                      {this.coordinatesDisplay(this.couleur[6],1,0)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[7],1,1)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[8],1,2)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[9],1,3)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[10],1,4)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[11],1,5)}
                  </View>

              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>

                  <View>
                      {this.coordinatesDisplay(this.couleur[12],2,0)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[13],2,1)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[14],2,2)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[15],2,3)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[16],2,4)}
                  </View>
                  <View>
                      {this.coordinatesDisplay(this.couleur[17],2,5)}
                  </View>

              </View>

            </View>

    )}



}
const window = Dimensions.get('window')
const styles= StyleSheet.create({
    red: {height:50,width:50,backgroundColor:'red',borderRadius: 50/2},
    yellow: {height:50,width:50,backgroundColor:'yellow',borderRadius:50/2},
    blue:{height:50,width:50,backgroundColor:'blue',borderRadius:50/2}
})

const mapStateToProps = state => {
  return {
    answersComplete: state.paramChange.answersComplete,
    answerList: state.paramChange.answerList,
    list : state.paramChange.list,
    time : state.paramChange.time,
    seqLength : state.paramChange.seqLength,
  }
  // return state
}

export default connect(mapStateToProps)(AnswerMatrix)

import React from 'react'
import {StyleSheet,View,Text,Button} from 'react-native'


class DisplayResults extends React.Component{


constructor(props){
        super(props)
        this.rep = this.props.navigation.getParam('rep')
        this.diffSeq = this.props.navigation.getParam('diffSeq')
        this.sequence = this.props.navigation.getParam('sequence')
        this.reponse = this.props.navigation.getParam('reponse')
    }

compareSequence(tab1,tab2){
    var res = true;
    if ( tab1.length == tab2.length ) {
        for( var i =0 ; i<tab1.length ; i++ ){
            if(tab1[i]!=tab2[i]) res=false;
        }
    }
    return res
}

afficheRes(){
    if(this.compareSequence(this.sequence,this.reponse)){
        return(
        <View>
            <Text style={styles.text}> Gagné !!! </Text>
        </View>
        )
    }
    else {
        return(
        <View>
            <Text style={styles.text}> Réessaye </Text>
        </View>
        )
    }
    }

retourDebut(){
    this.diffSeq = this.diffSeq+1;
    console.log('DiffSeqAffSiJOuN'+this.diffSeq)
    this.props.navigation.navigate('Jeu',{pressed:true,rep:this.rep, diffSeq : this.diffSeq})
}

retourAccueil(){
    this.props.navigation.navigate('Accueil',{rep:this.rep})
}

_boutonAccueil(){
    if(this.rep==2){
        return(
        <View>
            <Button title='AccueilForReal' onPress={()=>this.retourAccueil()}/>
        </View>
        )
    }
}

 render(){
        console.log('repAffJusteNon'+this.rep)
        console.log('diffSeqAffJOuN'+this.diffSeq)
        return(
        <View style={styles.main_container}>
            <View style={{justifyContent:'center'}}>
                {this.afficheRes()}
            </View>

            <View style={{justifyContent:'center'}}>
                <Button title='accueil' onPress={()=>this.retourDebut()}/>
            </View>
            <View style = {{justifyContent:'center',alignItems:'center'}}>
                {this._boutonAccueil()}
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
    text: {
        fontSize:30,
        fontWeight:'bold',
    }
})



export default DisplayResults

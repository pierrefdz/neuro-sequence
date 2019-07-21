// navigation/Navigation.js

import {createSwitchNavigator} from 'react-navigation'
// import Jeu from '../components/Jeu'
import Accueil from '../components/Accueil'
// import AnswerChoice from'../components/AnswerChoice'
import AnswerMatrix from'../components/AnswerMatrix'
// import AnswerTriangle from'../components/AnswerTriangle'
import SequenceChoice from'../components/SequenceChoice'
// import Sequence from'../components/Sequence'
import Try from '../components/Try'
import Result from '../components/Result'


const SearchSwitchNavigator = createSwitchNavigator({
    Accueil :{
      screen: Accueil,
      navigationOptions:{
        title:'Accueil'
      }
    },
    // Jeu:{
    //   screen:Jeu
    // },
    // AnswerChoice:{
    //     screen: AnswerChoice
    // },
    AnswerMatrix:{
      screen: AnswerMatrix
    },
    // AnswerTriangle:{
    //   screen: AnswerTriangle
    // },
    SequenceChoice:{
      screen: SequenceChoice
    },
    // Sequence:{
    //   screen: Sequence
    // },
    Try:{
      screen: Try
    },
    Result:{
      screen: Result
    },
})

export default SearchSwitchNavigator

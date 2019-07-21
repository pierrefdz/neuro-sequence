const initialState = {tutoLu:false, ratio:0,nbreGoodAnswer:0, seqGoodAnswers:0,bestScore:0}



function persistChange(state = initialState, action) {
  let nextState
  switch (action.type) {
          case 'tutoLu':
           nextState={
            ...state,
            tutoLu: true
        }
        return nextState;
        break;

          case 'ratio':
           nextState={
            ...state,
            ratio: action.value
        }
        return nextState;
        break;
       case 'nbreGoodAnswer':
           nextState={
            ...state,
            nbreGoodAnswer: action.value
        }
        return nextState;
        break;
        case 'seqGoodAnswers':
            nextState={
             ...state,
             seqGoodAnswers: action.value
         }
         return nextState;
         break;
            case 'bestScore':
           nextState={
            ...state,
            bestScore: action.value
        }
        return nextState;
        break;


  default:
    return state
  }
}

export default persistChange

const initialState = { dureeApparition: 5, dureeReste: 100, dureeDisparition: 5, dureeEntre: 300, list:['','','','','',''], answerList:['','','','','',''], diffSeq: 0, nbSeq:1,answersComplete: false,time:['','','','','',''],score : 0,seqLength:6}
// const initialState = {dureeReste: 100}


function paramChange(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'list':
      nextState = {
        ...state,
        list: action.value
      }
      return nextState;
      break;
    case 'appa':
      nextState = {
        ...state,
        dureeApparition: action.value
      }
      return nextState;
      break;
    case 'rest':
      nextState = {
        ...state,
        dureeReste: action.value
      }
      return nextState;
      break;
    case 'disp':
      nextState = {
        ...state,
        dureeDisparition: action.value
      }
      return nextState;
      break;
    case 'entr':
      nextState = {
        ...state,
        dureeEntre: action.value
      }
      return nextState;
      break;
    case 'diffSeq':
      nextState = {
        ...state,
        diffSeq: state.diffSeq+1
      }
      return nextState;
      break;
    case 'nbSeq':
      nextState = {
        ...state,
        nbSeq: action.value
      }
      return nextState;
      break;
    case 'answerList':
      nextState = {
        ...state,
        answerList: action.value
      }
      return nextState;
      break;
    case 'answersComplete':
      nextState = {
        ...state,
        answersComplete: action.value
      }
      return nextState;
      break;
    case 'time':
        nextState={
            ...state,
            time : action.value
        }
        return nextState;
        break;
    case 'score':
        nextState={
            ...state,
            score : action.value
        }
        return nextState;
        break;
      case 'seqLength':
          nextState={
            ...state,
            seqLength : action.value
        }
        return nextState;
        break;


  default:
    return state
  }
}

export default paramChange

import { createStackNavigator ,createAppContainer} from 'react-navigation';

// You can import from local files
import DeckDetails from './components/DeckDetails';
import Home from './components/Home';
import NewQuestion from './components/NewQuestion';
import NewDeck from './components/NewDeck';
import QuizView from './components/QuizView';
import ScoreView from './components/ScoreView';
const Stack = createStackNavigator({
  Home: {
    screen: Home
  },
  DeckDetails: {
    screen: DeckDetails
  },
  NewQuestion:{
    screen:NewQuestion
  },
  NewDeck:{
    screen:NewDeck
  },
  QuizView:{
    screen:QuizView
  },
  ScoreView:{
    screen:ScoreView
  },
},{ initialRouteName: 'Home'});
export const AppContainer = createAppContainer(Stack);
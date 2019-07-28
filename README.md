# MobileFlasCardApp
This project was done using snack expo client.

check the expo documentation https://docs.expo.io/versions/latest/

This is flashcard consists of multiple deck.Each deck has a certain number of question.One can take quizzes of all the question present in the deck.One can also add new question and new deck to the present deck and decklist respectively.After the quiz the user will be provided with the score.

### `Install`

Install all the required node modules using npm install

### `npm start`

Runs the app in the development mode.<br>
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### components
1.Deck-This is the component which hold all the card structure of each deck.

2.Home-This component gets loaded when the app is loaded.This component sets the data to be used be other components.

3.DeckDetails-This components show all the deck details.This will show the number of questions which are there in the deck.This will give two option ,one to take a quiz and second to add new questions.

4.NewQuestion-This component will enable the user to ask a new question and also allow to add the required answer.

5.NewDeck-This component will enable the user to add new deck.
6.QuizView-This component will help the user to take a quiz and mark their guess as correct or incorrect.
7.ScoreView-This will show the total score of the user.
### API calls

data.js contains all the required data.We are fetching,saving and merging to the data using AsyncStorage.

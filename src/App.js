import React from 'react';
import Form from './components/Form';
import { Grid, Typography, Paper, Divider, 
        Button, Dialog, DialogActions, 
        DialogContent, DialogContentText, DialogTitle } 
        from '@material-ui/core';
import Progress from './components/progress';
import {initialState, sendFeedback} from './util';

import './App.css';

class App extends React.Component {

  state = initialState();

  resetGame = () => {
    const form = document.querySelector('#form');
    form.reset();
    this.setState(initialState());
  }

  openInstructions = () => this.setState({open: true});

  closeInstructions = () => this.setState({open: false});

  updateAppState = (guess) => {

    const {generatedNumber} = this.state;
    const diff = guess - generatedNumber;

    if (diff === 0) {
      this.setState({successDialogBoxOpen: true});
    }
    else  {
      this.setState(prevState => ({
        guess,
        allGuess: [ ...prevState.allGuess, {guess}],
        attempt: prevState.attempt+1,
        feedback: sendFeedback(guess, diff),
        score: prevState.score-1,
      }));
    }
  }

  render() {

    const {allGuess, attempt, feedback, successDialogBoxOpen, open, score} = this.state;

    const guessList = allGuess.map((item, index) => (
      <li key={index}>
        <span>{item.guess}</span>
      </li>
    ))

    return (
      <div className="app">

        <Grid container style={{ height: '100vh'}} justify="center" alignItems="center">
          <Grid item xs={3}>
            <Paper style={{padding: '50px'}} elevation={6}>
              <Typography align="center" variant="h3" gutterBottom>GUESS THE NUMBER</Typography>
              <Divider style={{ margin: '20px 0'}} />
              <Form returnGuessToApp={guess => this.updateAppState(guess)} />
              <Typography style={{paddingTop: '20px'}} align="center" variant="subtitle2" color="error" >{feedback}</Typography>
              <Progress attempt={attempt} guessList={guessList} />
              <Button style={{ marginBottom: '15px' }} fullWidth variant="contained" color="primary" onClick={this.resetGame}>Reset Game</Button>
              <Button style={{ marginBottom: '15px' }} fullWidth variant="contained" color="secondary" onClick={this.openInstructions}>
                How to play
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/*success dialog box */}
        <Dialog
          open={successDialogBoxOpen}
          onClose={this.resetGame}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" align="center"> Score: {score} </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Hurray! You guessed it right! 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.resetGame} color="primary">
              Play again!
            </Button>
          </DialogActions>
        </Dialog>

        {/* instruction on how to play */}
        <Dialog
            open={open}
            onClose={this.closeInstructions}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" align="center"> How to play </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <p>The goal is to guess an unknown random number (say y) in the range 1 and 100, both inclusive, in minimum possible guesses. You can make as many guesses as you want. Based on the your guess (say x), you'll recieve one of the following feedbacks:</p>
                    <ul>
                        <li> TOO HIGH if x is greater than y and their absolute difference is more than 30</li>
                        <li> HIGH if x is greater than y and their absolute difference is more than 10</li>
                        <li> NEAR if absolute difference of x and y is less than or equal 10</li>
                        <li> LOW if x is less than y and their absolute difference is more than 10</li>
                        <li> TOO LOW if x is less than y and their absolute difference is more than 30</li>
                        <li> SUCCESS if the number is guessed correctly</li>
                    </ul>
                    <p>Now, get ready to give your brain a little exercise! Best of luck! :)</p>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={this.closeInstructions}>
                    Continue!
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;

import React from 'react';
import Form from './components/forms'
import { Grid, Typography, Paper, Divider } from '@material-ui/core'
import Progress from './components/progress'
import {initialState} from './util';
import {Button} from '@material-ui/core';

class App extends React.Component {

  state = initialState();

  resetGame = () => this.setState(initialState());

  updateAppState = (guess) => {

    const {generatedNumber} = this.state;
    const absDiff = Math.abs(guess - generatedNumber);

    this.setState(prevState => ({
      guess,
      allGuess: [ ...prevState.allGuess, {guess}],
      attempt: prevState.attempt+1,
    }));

  }

  render() {

    const {allGuess, attempt} = this.state;

    const guessList = allGuess.map((item, index) => (
      <li key={index}>
        <span>{item.guess}</span>
      </li>
    ))

    return (
      <Grid container style={{ height: '100vh'}} justify="center" alignItems="center">
        <Grid item xs={3}>
          <Paper style={{padding: '50px'}} elevation={6}>
            <Typography align="center" variant="h3" gutterBottom>GUESS THE NUMBER</Typography>
            <Divider style={{ margin: '20px 0'}} />
            <Form returnGuessToApp={guess => this.updateAppState(guess)} />
            <Progress attempt={attempt} guessList={guessList} />
            <Button style={{ marginBottom: '15px' }} fullWidth variant="contained" color="primary" onClick={this.resetGame}>Reset Game</Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default App;

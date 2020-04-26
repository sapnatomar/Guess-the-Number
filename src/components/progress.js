import React from 'react';
import {Typography} from '@material-ui/core';
import './progress.css';

const Progress = ({ attempt, guessList}) => (
    <div>
        <Typography style={{marginTop: '20px'}} variant="h5"> Guess # {attempt}</Typography>
        <ul className="progressBar__history">
            {!guessList.length && <p className="guessList">Your guessed numbers will be displayed here.</p>}
            {guessList}
        </ul>
    </div>
)

export default Progress;
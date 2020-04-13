import React from 'react';
import {Typography} from '@material-ui/core';
import './progress.css';

const Progress = ({ attempt, guessList}) => (
    <div>
        
        <Typography style={{marginTop: '20px'}} variant="h4"> Guess # {attempt}</Typography>
        <ul className="progressBar__history">
            {guessList}
        </ul>
    </div>
)

export default Progress;
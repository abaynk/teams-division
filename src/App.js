import './App.css';
import React from 'react';
import { Button, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography,  } from '@material-ui/core';

const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const chunkify = (a, n, balanced) => {
    
  if (n < 2)
      return [a];

  var len = a.length,
          out = [],
          i = 0,
          size;

  if (len % n === 0) {
      size = Math.floor(len / n);
      while (i < len) {
          out.push(a.slice(i, i += size));
      }
  }

  else if (balanced) {
      while (i < len) {
          size = Math.ceil((len - i) / n--);
          out.push(a.slice(i, i += size));
      }
  }

  else {

      n--;
      size = Math.floor(len / n);
      if (len % size === 0)
          size--;
      while (i < size * n) {
          out.push(a.slice(i, i += size));
      }
      out.push(a.slice(size * n));

  }

  return out;
}

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      input: '',
      names: [],
      isDone: false,
      teamsNumber: null,
      dividedTeams: null,
      isDivided: false,
    }
    this.divideIntoTeams = this.divideIntoTeams.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitName = this.submitName.bind(this);
    this.handleDone = this.handleDone.bind(this);

  }
  handleChange(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value
    });
  }

  submitName(e) {
    e.preventDefault();
    const currentName = this.state.input;
    this.setState({
      input: '',
      names: this.state.names.concat(`${currentName} `)
    });
  }

  handleDone(e) {
    e.preventDefault();
    this.setState({
      input: '',
      isDone: true
    })
  }

  divideIntoTeams (e) {
    e.preventDefault();
    const teams = this.state.input;
      if (!isNaN(teams)){
      this.setState({
        input: '',
        teamsNumber: parseInt(teams),
        dividedTeams: chunkify(shuffle(this.state.names),teams,true),
        isDivided: true,
      })
    }
  }

  startOver(e) {
    e.preventDefault();
    window.location.reload();
  }
  
  render() {
    return (
      <div className="App">
        <div className='form-div'>
        <form className='form'>
          <div className='input-div' id='first-input'>
            <TextField 
              className='input'
              autoComplete='off'
              value={this.state.input}
              onChange={this.handleChange.bind(this)}
              type="text" 
              name="name" 
              id="outlined-basic" 
              label={this.state.isDone ? 'Type in number of Teams' : 'Type in a new Name:'}
              variant="outlined" 
              size='large'
              color='secondary'
            />
          </div>
          <div className='input-div'>
            <Button
              className='input'
              onClick={!this.state.isDone ? this.submitName : this.divideIntoTeams}
              disabled={!this.state.input}
              id='submit' 
              type="submit" 
              value="Submit"  
              variant="contained" 
              size='large'
              color='primary'>
              {!this.state.isDone ? 'Submit Player' : 'Submit Teams Number and Divide into Teams'}
            </Button>
          </div>
          
          {this.state.names.length>0 ? 
          <div className='input-div'>
            <Button
              className='input'
              variant="contained" 
              color="primary"
              onClick={!this.state.isDivided ? this.handleDone : this.startOver}
              id='done' 
              type="submit" 
              value="Done"
              size='large'>  
              {!this.state.isDone ? 'Submit Players List' : 'Start over'}
            </Button>
          </div> : <p></p>}
        </form>

        </div>
        <Typography className='text' style={{color:'white'}}variant='h3'>Players List:</Typography>
        {!this.state.isDone ? 
        <div className='list-div'>
          <List className='list'>
            {this.state.names.map((name, index)=>{
              return(
                <div  className='list-item'>
                  <ListItem>
                    <ListItemAvatar>
                      {index+1}.
                    </ListItemAvatar>
                    <ListItemText >{name}</ListItemText>
                  </ListItem>
                </div>
              )
            })}
          </List>
        </div>
          : <div className='list-div'>
              <Typography variant="h6" className='text' style={{color:'white'}}>
                Teams Number: {this.state.teamsNumber}
              </Typography>
              {!this.state.isDivided ?
                <p></p> :
                <List className='list'>
                  {this.state.dividedTeams.map((team, index)=>{
                    return(
                      <div className='list-item'>
                        <ListItem className='list-item'>
                          <ListItemAvatar>
                            {index+1}.
                          </ListItemAvatar>
                          <ListItemText >{team}</ListItemText>
                        </ListItem>
                      </div>
                    )
                  })}
                </List>}
            </div>
        }
      </div>
    );
  }
}

export default App;

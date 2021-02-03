import './App.css';
import React from 'react';

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
    if (currentName !== '') {
      this.setState({
        input: '',
        names: this.state.names.concat(`${currentName} `)
      });
    }
  }

  handleDone(e) {
    e.preventDefault();
    this.setState({
      isDone: true
    })
  }

  divideIntoTeams (e) {
    e.preventDefault();
    const teams = this.state.input;
    this.setState({
      input: '',
      teamsNumber: parseInt(teams),
      dividedTeams: chunkify(shuffle(this.state.names),teams,true),
      isDivided: true,
    })
  }

  startOver(e) {
    e.preventDefault();
    window.location.reload();
  }

  render() {
    document.body.style.backgroundColor = '#6c757d';
    return (
      <div className="App">
        <h1 style={{color:'#dee2e6'}}>Player's List:</h1>
        <div className='display'>
        {!this.state.isDone ? <ol style={{color:'#212529'}}>
                                {this.state.names.map( (name, index) => {
                                  return(
                                    <li key={index}>{name}</li>
                                  )
                                })}
                              </ol> : 
                            <div style={{color:'#dee2e6'}}>
                              <h2>Teams Number: {this.state.teamsNumber}</h2>
                              {!this.state.isDivided ? <p></p> :
                              <ol>
                                {this.state.dividedTeams.map((team, index)=>{
                                  return(
                                    <li className='li' key={index}>{team}</li>
                                  )
                                })}
                              </ol>}
                            </div>
        }
        </div>
        <form>
          <label style={{color:'#dee2e6'}}>
            {this.state.isDone ? 'Type in number of Teams' : 'Type in a new Name:'}<br></br>
          </label>
          <input 
            value={this.state.input}
            onChange={this.handleChange.bind(this)}
            id='input'
            type="text" 
            name="name" 
            style={{backgroundColor:'#e9ecef', border:'1px solid #212529'}} 
          />
          <button 
            onClick={!this.state.isDone ? this.submitName : this.divideIntoTeams}
            id='submit' 
            type="submit" 
            value="Submit" 
            style={{backgroundColor:'#e9ecef', border:'none'}} 
          > {!this.state.isDone ? 'Submit Player' : !this.state.isDivided ? 'Submit Teams Number and Divide into Teams' : ''} </button>
          <button 
            onClick={!this.state.isDivided ? this.handleDone : this.startOver}
            id='done' 
            type="submit" 
            value="Done" 
            style={{backgroundColor:'#e9ecef', border:'none'}} 
          > {!this.state.isDone ? 'Submit Players List' : this.state.isDivided ? 'Start over' : ''} </button>
        </form>
      </div>
    );
  }
}

export default App;

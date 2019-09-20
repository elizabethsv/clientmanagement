import React,{Component} from 'react';
import './App.css';
import Calendar from 'react-calendar';
import Schedule from './components/pt/Schedule'


class App extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
 
  render() {
    return (
      <div className="container">
        <Schedule/>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default App;

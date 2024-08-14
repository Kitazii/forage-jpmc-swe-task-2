import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
 //added showGraph bool to the interface
interface IState {
  data: ServerRespond[],
  showGraph: boolean
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
    //set initial state of the graph to false, awaiting user to click the button before showing the graph
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
      //if the user clicks the button render the graph
      if (this.state.showGraph){
        return (<Graph data={this.state.data}/>)
      }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
      //initialize a counter variable 'x' to keep track of the number of intervals executed
      let x = 0;

      //start an interval that runs every 100 milliseconds
      const interval = setInterval(() => {
        //fetch data from the server using DataStreamer.getData method
        DataStreamer.getData((serverResponds: ServerRespond[]) => {
            //update the components state with the servers response and display the graph
        this.setState({
            data: serverResponds, //update data state with the new server response
            showGraph: true //set showGraph state to true to display the graph
            });
        });
        x++; //increment counter

        //check if the counter exceeds 1000 intervals
        if (x > 1000) {
            clearInterval(interval); //if so clear the interval to stop further executions
        }
      }, 100) //interval set to run every 100 millisecond
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

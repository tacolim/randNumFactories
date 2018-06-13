import React, { Component } from 'react';
import './createFactory.css';


class CreateFactory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      numNodes: [],
      rangeMin: 0,
      rangeMax: 0,
      errors: {},
    };
  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value,
    });
  }
  
  getRand = (min, max) => {
    if (min <= max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    if (min > max) {
      return null;
    }
  }

  onAddNodeBtnClick = (event) => {
    let numNodes = this.state.numNodes;
    let rand = this.getRand(this.state.rangeMin, this.state.rangeMax);
    if (numNodes > 14) {
      alert("Maximum number of nodes is 15.");
      return;
    } else if (rand === null) {
      alert("Please ensure that minimum random number <= maximum random number.");
      return;
    } else {
      this.setState({
        numNodes: numNodes.concat(rand)
      });
    }
  }

  render() {
    const { props } = this;
    return (
      <div logout={props.logout}>
        <div className="root">
          <div className="factoryContent">
            <div className="factoryForm">
              <form>
                <label htmlFor="factoryTitle">Name Your Factory:</label><br/>
                <input type="text" name="factoryTitle" value={this.state.title} onChange={event => this.handleChange(event, 'title')} />
                <br/>
                {/* <label htmlFor="factoryNumNodes">Number of Nodes (0-15):</label><br/>
                <input type="text" name="factoryNumNodes" pattern="(1[0-5]{1}|[0-9]{1})" value={this.state.numNodes} onChange={event => this.handleChange(event, 'numNodes')} /> */}
                <br/>
                <label htmlFor="factoryRangeMin">Random Number Minimum:</label><br/>
                <input type="number" name="factoryRangeMin" value={this.state.rangeMin} onChange={event => this.handleChange(event, 'rangeMin')} />
                <br/>
                <label htmlFor="factoryRangeMax">Random Number Maximum:</label><br/>
                <input type="number" name="factoryRangeMax" value={this.state.rangeMax} onChange={event => this.handleChange(event, 'rangeMax')} />
                <label htmlFor="addNode">Add Node with Random Number Within Range: </label>
                <button name="addNode" onClick={this.onAddBtnClick}>+</button>
              </form>
            </div>
            <div className="factoryImage">
              <p>{this.state.title}</p>
              <p>{this.state.numNodes}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


{/* <div className="factoryForm">
<form>
  <label htmlFor="factoryTitle">Name Your Factory:</label><br/>
  <input type="text" name="title" />
  <br/>
  <label htmlFor="factoryNumNodes">Number of Nodes (0-15):</label><br/>
  <input type="number" name="numNodes" min="0" max="15" />
  <br/>
  <label htmlFor="factoryRangeMin">Random Number Minimum:</label><br/>
  <input type="number" name="rangeMin" />
  <br/>
  <label htmlFor="factoryRangeMax">Random Number Maximum:</label><br/>
  <input type="number" name="rangeMax" />
  <input type="submit" value="Run Factory!" />
</form>
</div> */}

// this is the original version that updates as you type
// <div className="factoryForm">
{/* <form>
  <label htmlFor="factoryTitle">Name Your Factory:</label><br/>
  <input id="factoryTitle" type="text" name="factoryTitle" value={this.state.title} onChange={event => this.handleChange(event, 'title')} />
  <br/>
  <label htmlFor="factoryNumNodes">Number of Nodes (0-15):</label><br/>
  <input id="factoryNumNodes" type="number" name="factoryNumNodes" value={this.state.numNodes} onChange={event => this.handleChange(event, 'numNodes')} min="0" max="15" />
  <br/>
  <label htmlFor="factoryRangeMin">Random Number Minimum:</label><br/>
  <input id="factoryRangeMin" type="number" name="factoryRangeMin" value={this.state.rangeMin} onChange={event => this.handleChange(event, 'rangeMin')} />
  <br/>
  <label htmlFor="factoryRangeMax">Random Number Maximum:</label><br/>
  <input id="factoryRangeMax" type="number" name="factoryRangeMax" value={this.state.rangeMax} onChange={event => this.handleChange(event, 'rangeMax')} />
  <input type="submit" value="Run Factory!" />
</form> */}
// </div>


export default CreateFactory;

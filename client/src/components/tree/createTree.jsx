import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../layout';
import { addTree } from '../../actions';
import uuidv4 from 'uuid/v4';


class CreateTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'tree title',
      factories: [],
      factTitle: '',
      nodes: [],
      numNodes: 0,
      rangeMin: 0,
      rangeMax: 0,
    };
  }
  
  // handle event for changes in form fields
  handleChange(e, field) {
    this.setState({
      [field]: e.target.value,
    });
  }
  
  // function to get random number for nodes
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

  // handle event for adding a factory
  onAddFactoryClick = (event) => {
    let factories = this.state.factories;
    let numNodes = parseInt(this.state.numNodes, 10);
    let rangeMin = parseInt(this.state.rangeMin, 10);
    let rangeMax = parseInt(this.state.rangeMax, 10);
    let nodes = this.state.nodes;
    if (numNodes < 0 || numNodes > 15) {
      alert("Number of nodes must be between 0 and 15");
      return;
    } else if (rangeMin > rangeMax) {
      alert("Random Number Minimum must be <= Random Number Maximum");
      return;
    }
    for (let i = 0; i < numNodes; i++) {
      nodes.push(this.getRand(rangeMin, rangeMax));
    }
    this.setState({
        factories: factories.concat({
          factTitle: this.state.factTitle,
          nodes: this.state.nodes,
          numNodes: numNodes,
          rangeMin: rangeMin,
          rangeMax: rangeMax,
        }),
        nodes: [],
    });
  }

  // handle event for deleting a factory
  onDeleteFactoryClick = (index, event) => {
    let newFactories = this.state.factories;
    let newFactories1 = newFactories.slice(0, index);
    let newFactories2 = newFactories.slice(index+1, newFactories.length+1);
    newFactories = newFactories1.concat(newFactories2);
    this.setState({
        factories: newFactories,
    });
  }

  addTree = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const factories = this.state.factories;
    const tree =  { name, factories };
    this.props.addTree(tree);
  }

  render() {
    const { props } = this;
    let factories = this.state.factories;

    return (
      <Layout logout={props.logout}>
        <div className="root">
          <div className="createTitle">
            <h2>Customize Your Tree</h2>
            <button type="button" className="saveTree" onClick={this.addTree}>Save Your Tree!</button>
          </div>
          <section className="tree_content">
            <section className="tree-area">
              <div className="nameTree">
                <label htmlFor="tree">Name Your Tree: </label><br />
                <input type="text" name="tree" value={this.state.name} onChange={event => this.handleChange(event, 'name')} />
              </div>
              <div className="factoryForm">
                <p>Add Random Number Factories by Filling Out the Below!</p>
                <form>
                  <label htmlFor="factoryTitle">Name Your Factory:</label><br/>
                  <input type="text" name="factoryTitle" value={this.state.factTitle} onChange={event => this.handleChange(event, 'factTitle')} />
                  <br/>
                  <label htmlFor="factoryNumNodes">Number of Nodes (0-15):</label><br/>
                  <input type="number" name="factoryNumNodes" min="0" max="15" value={this.state.numNodes} onChange={event => this.handleChange(event, 'numNodes')} />
                  <br/>
                  <label htmlFor="factoryRangeMin">Random Number Minimum:</label><br/>
                  <input type="number" name="factoryRangeMin" value={this.state.rangeMin} onChange={event => this.handleChange(event, 'rangeMin')} />
                  <br/>
                  <label htmlFor="factoryRangeMax">Random Number Maximum:</label><br/>
                  <input type="number" name="factoryRangeMax" value={this.state.rangeMax} onChange={event => this.handleChange(event, 'rangeMax')} />
                  <br />
                  <button type="button" onClick={event => this.onAddFactoryClick(event)}>Add Factory!</button>
                </form>
              </div>
            </section>
            <section className="factoriesSec">
              <h3 className="factoriesTitle">{this.state.name}</h3>
              <div className="factories">
                {factories.map((factory, index) => {
                  return (
                    <div key={factory.factID} className="factory">
                      <div className="factoryTitle">Factory Title: {factory.factTitle}</div>
                      <div className="nodes">
                        {factory.nodes.map((node) => {
                          return <div key={uuidv4()} className="node">{node}</div>
                        })}
                      </div>
                      <button type="button" className="deleteBtn" onClick={(event) => this.onDeleteFactoryClick(index, event)}>Delete Factory!</button>
                    </div>
                  )
                })}
              </div>
            </section>
          </section>
        </div>
        <style jsx scoped>
          {`
        .root {
          max-width: 1440px;
          margin: 0 auto;
          padding: 20px;
        }
        .createTitle {
          font-family: 'Raleway', sans-serif;
          color: #003366;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .saveTree {
          background: #90EE90;
          color: white;
        }
        input {
          background-color: white;
          color: #003366;
          font-family: 'Raleway', sans-serif;
          height: 25px;
          border-radius: 4px;
          border: 1px solid transparent;
          box-shadow: 0 1px 3px 0 #0000003b;
          transition: box-shadow 150ms ease;
          margin-bottom: 10px;
          margin-right: 20px;
          outline: none;
          font-size: 14px;
          padding: 0 15px 0 10px;
        }
        input:focus {
          box-shadow: 0 1px 3px 0 #cfd7df;
        }
        button {
          background-color: #003366;
          color: white;
          font-family: 'Raleway', sans-serif;
          height: 30px;
          border-radius: 4px;
          border: 1px solid transparent;
          box-shadow: 0 1px 3px 0 #0000003b;
          transition: box-shadow 150ms ease;
          margin-bottom: 20px;
          margin-right: 20px;
          outline: none;
          font-size: 14px;
          padding: 0 15px 0 10px;

        }
        label {
          color: #003366;
          font-family: 'Raleway', sans-serif;
        }
        .tree_content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          background: #99adc2;
          padding: 10px;
          border-radius: 4px;
        }
        .tree-area {
          display: flex;
          flex-direction: column;
          min-width: 200px;
          max-width: 250px;
        }
        .nameTree {
          display: block;
          font-family: 'Raleway', sans-serif;
          color: #003366;
        }
        .factoryForm p {
          font-family: 'Raleway', sans-serif;
          color: #003366;
          text-align: center;
          font-style: italic;

        }
        .factoriesSec {
          font-family: 'Raleway', sans-serif;
          color: #003366;
          width: auto;
        }
        .factoriesTitle {
          text-decoration: underline;
          text-align: center;
        }
        .factories {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
        }
        .factory {
          display: flex;
          flex-direction: column;
          background: white;
          margin: 5px;
          padding: 5px 10px;
          border-radius: 4px;
          font-family: 'Raleway', sans-serif;
          color: #003366;
        }
        .factoryTitle {
          align-self: center;
        }
        .deleteBtn {
          background: #FF4500;
          margin-top: 8px;
          align-self: flex-end;
        }
        .nodes {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center
        }
        .node {
          border: 1px solid #003366;
          padding: 2px;
          border-radius: 4px;
          margin: 3px;
        }
        `}
        </style>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trees: state.trees
  };
};

export default connect(mapStateToProps, { addTree })(CreateTree);

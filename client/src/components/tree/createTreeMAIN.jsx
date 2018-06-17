import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import Layout from '../layout';
import { addTree } from '../../actions';
import './createTree.css';


class CreateTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      factories: [],
      factTitle: '',
      nodes: [],
      numNodes: 0,
      rangeMin: 0,
      rangeMax: 0,
      toDash: false,
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
  
  // save tree to database
  addTree = (event) => {
    event.preventDefault();
    const title = this.state.name;
    const factories = this.state.factories;
    const tree =  { title, factories };
    console.log(`createTree 88 tree info: `, tree.name, tree.factories);
    this.props.addTree(tree);
    this.setState({
      toDash: true,
    })
  }

  render() {
    const { props } = this;
    let factories = this.state.factories;

    if (this.state.toDash === true) {
      return <Redirect to='/trees' />;
    }

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
                <input type="text" name="tree" value={this.state.name} onChange={event => this.handleChange(event, 'name')} placeholder="tree title" />
              </div>
              <div className="factoryForm">}
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
                    <div key={uuidv4()} className="factory">
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

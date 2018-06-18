import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import Layout from '../layout';
import { getTree, editTree, deleteTree } from '../../actions';
import './createTree.css';

axios.defaults.withCredentials = true;
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://murmuring-ravine-52790.herokuapp.com' : 'http://localhost:8080';

class EditTree extends Component {
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

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setTree(id);
    console.log(`src/components/tree/edit/30 this got called ${this.props.match.params}`);

  }

  async setTree(id) {
    try {
      const authToken = window.localStorage.getItem('token');
      const { data } = await axios.get(`${ROOT_URL}/tree/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const { title, factories } = data;

      // we have tree, now we have to set the tree to edit;
      console.log('src/components/tree/edit/40 set tree: ', title, factories);
      this.setState({ 
        name: title,
        factories: factories });
      console.log('src/components/tree/edit/51 after setState tree: ',this.state.name, this.state.factories)
    } catch (e) {
      console.log('src/components/tree/edit/45 set tree error: ', e);
    }
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
    this.setState({
        factories: factories.concat({
          factID: uuidv4(),
          factTitle: '',
          nodes: [],
          numNodes: 0,
          rangeMin: 0,
          rangeMax: 0,
        }),
    });
  }

  // handle updating factory
  onUpdateFactoryClick = (id, event) => {
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
    let foundIndex = factories.findIndex(factory => factory.factID === id);
    let factUpdated = {
        factID: id,
        factTitle: this.state.factTitle,
        nodes: this.state.nodes,
        numNodes: numNodes,
        rangeMin: rangeMin,
        rangeMax: rangeMax,
    }
    factories[foundIndex] = factUpdated;
    this.setState({
        factories: factories,
        factTitle: '',
        numNodes: 0,
        rangeMin: 0,
        rangeMax: 0,
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
  updateTree = (event) => {
    event.preventDefault();
    const title = this.state.name;
    const factories = this.state.factories;
    const { id } = this.props.match.params;
    const tree =  { title, factories };
    console.log(`src/components/tree/edit/137 tree info: `, id, tree.title)
    console.log(tree.factories);
    this.props.editTree(id, tree);
    this.setState({
      toDash: true,
    })
  }

    // handle event for deleting a tree
    onDeleteTreeClick = (id, event) => {
      event.preventDefault();
      console.log(id);
      this.props.deleteTree(id);
      this.setState({
        toDash: true,
      })
    }

  render() {
    const { props } = this;
    let factories = this.state.factories;
    const { id } = this.props.match.params;

    if (this.state.toDash === true) {
      return <Redirect to='/trees' />;
    }

    return (
      <Layout logout={props.logout}>
        <div className="root">
          <div className="createTitle">
            <h2>Update Your Tree</h2>
            <div>
              <button type="button" className="saveTree" onClick={this.updateTree}>Update Tree</button>
              <button type="button" className="deleteTree" onClick={(event) => this.onDeleteTreeClick(id, event)}>Delete Tree</button>
            </div>
          </div>
          <section className="tree_content">
            <section className="tree-area">
              <div className="nameTree">
                <label htmlFor="tree">Update Tree's Title: </label><br />
                <input type="text" name="tree" value={this.state.name} onChange={event => this.handleChange(event, 'name')} placeholder="tree title" />
              </div>
              <div>
                <button type="button" onClick={event => this.onAddFactoryClick(event)}>Add Factory</button>
              </div>
            </section>
            <section className="factoriesSec">
              <h3 className="factoriesTitle">{this.state.name}</h3>
              <div className="factories">
                {factories.map((factory, index) => {
                  return (
                    <div key={factory.factID} className="factoryAll">
                      <div className="factory">
                        <div className="factoryTitle">Factory Title: {factory.factTitle}</div>
                        <p>Number of Nodes: {factory.nodes.length}</p>
                        <p>Range: {factory.rangeMin} to {factory.rangeMax}</p>
                        <div className="nodes">
                          {factory.nodes.map((node) => {
                            return <div key={uuidv4()} className="node">{node}</div>
                          })}
                        </div>
                      </div>
                      <div>
                        <form className="factoryForm">
                          <p>Edit Factory</p>
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
                          <button type="button" onClick={event => this.onUpdateFactoryClick(factory.factID, event)}>UpdateFactory</button>
                        </form>
                        <button type="button" className="deleteBtn" onClick={(event) => this.onDeleteFactoryClick(index, event)}>Delete Factory</button>
                      </div>
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
    treeToEdit: state.tree
  };
};

export default connect(mapStateToProps, { getTree, editTree, deleteTree })(EditTree);

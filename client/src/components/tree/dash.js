import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTrees } from '../../actions';
import Layout from '../layout';
import './dash.css';


class Dash extends Component {
  componentDidMount() {
    this.props.getTrees();
  }

  render() {
    const { props } = this;

    return (
      <Layout logout={props.logout}>
        <div className="root">
          <div className="welcome">
            <span>Welcome!</span>
            <Link to="/tree/create" className="create">Create Trees</Link>
          </div>
          <section className="content">
            <div className="trees">{!!props.trees.length && props.trees.map(tree => (
              <div key={tree._id}>
                <Link to={`tree/edit/${tree._id}`} props={tree._id} className="tree-link">{tree.title}</Link>
              </div>
              ))}
            </div>
            {!props.trees.length &&
              <Link to="/tree/create" className="empty">
                <span>You don't have any trees!</span>
                <span>Click to get started!</span>
              </Link>
            }
          </section>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  trees: state.trees,
});

export default connect(mapStateToProps, { getTrees })(Dash);
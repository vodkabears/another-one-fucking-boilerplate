import React, { PropTypes } from 'react';
import './page.css';

export default class Page extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="page__container">
          <div className="page__image"></div>
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

Page.defaultProps = {
  title: 'Boilerplate',
  description: 'Another one'
};

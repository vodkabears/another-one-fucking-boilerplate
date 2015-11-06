import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

export default class PageTypeWelcome extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.page}>
          <div className={styles.image}></div>
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
          <Link to="/examples/todo">Todo-list example</Link>
        </div>
      </div>
    );
  }
}

PageTypeWelcome.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

PageTypeWelcome.defaultProps = {
  title: 'Boilerplate',
  description: 'Another one'
};

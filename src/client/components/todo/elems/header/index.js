import React, { PropTypes } from 'react';
import InputTypeTodoHeader from 'client/components/input/mods/type/todo-header';
import CheckboxTypeTodoHeader from 'client/components/checkbox/mods/type/todo-header';
import styles from './styles.css';

export default class TodoHeader extends React.Component {
  render() {
    return (
      <header className={styles.todoHeader}>
        <CheckboxTypeTodoHeader />
        <InputTypeTodoHeader placeholder={this.props.placeholder} />
      </header>
    );
  }
}

TodoHeader.propTypes = {
  placeholder: PropTypes.string
};

TodoHeader.defaultProps = {
  placeholder: 'What needs to be done?'
};

import React, { PropTypes } from 'react';
import CheckboxTypeTodoAdd from 'client/components/checkbox/mods/type/todo-add';
import InputTypeTodoAdd from 'client/components/input/mods/type/todo-add';
import styles from './styles.css';

export default class TodoAdd extends React.Component {
  render() {
    return (
      <div className={styles.todoAdd}>
        <CheckboxTypeTodoAdd />
        <InputTypeTodoAdd placeholder={this.props.placeholder} />
      </div>
    );
  }
}

TodoAdd.propTypes = {
  placeholder: PropTypes.string
};

TodoAdd.defaultProps = {
  placeholder: 'What needs to be done?'
};

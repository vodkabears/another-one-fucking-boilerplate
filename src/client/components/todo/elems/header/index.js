import React, { PropTypes } from 'react';
import { Dispatcher, EVENTS } from 'lib/dispatcher';
import InputTypeTodoHeader from 'client/components/input/mods/type/todo-header';
import CheckboxTypeTodoHeader from 'client/components/checkbox/mods/type/todo-header';
import styles from './styles.css';

const ENTER_KEY = 13;

export default class TodoHeader extends React.Component {
  _handleCheckboxChange(e) {
    Dispatcher.emit(EVENTS.TodoToggleAll, {
      areCompleted: e.target.checked
    });
  }

  _handleInputKeyDown(e) {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    Dispatcher.emit(EVENTS.TodoItemCreate, {
      text: e.target.value
    });
  }

  render() {
    return (
      <header className={styles.todoHeader}>
        <CheckboxTypeTodoHeader onChange={this._handleCheckboxChange.bind(this)} />
        <InputTypeTodoHeader onKeyDown={this._handleInputKeyDown.bind(this)} placeholder={this.props.placeholder} />
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

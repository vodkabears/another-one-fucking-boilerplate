import Input from 'client/components/input';
import styles from './styles.css';

export default class InputTypeTodoItem extends Input {}

/**
 * @override
 */
InputTypeTodoItem.defaultProps = Object.assign({}, Input.defaultProps, {
  styles
});

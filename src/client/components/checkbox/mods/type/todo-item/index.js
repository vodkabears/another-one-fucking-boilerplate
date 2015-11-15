import Checkbox from 'client/components/checkbox';
import styles from './styles.css';

export default class CheckboxTypeTodoItem extends Checkbox {}

/**
 * @override
 */
CheckboxTypeTodoItem.defaultProps = Object.assign({}, Checkbox.defaultProps, {
  styles
});

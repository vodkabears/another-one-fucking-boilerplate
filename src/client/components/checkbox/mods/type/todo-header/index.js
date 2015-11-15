import Checkbox from 'client/components/checkbox';
import styles from './styles.css';

export default class CheckboxTypeTodoHeader extends Checkbox {}

/**
 * @override
 */
CheckboxTypeTodoHeader.defaultProps = Object.assign({}, Checkbox.defaultProps, {
  styles
});

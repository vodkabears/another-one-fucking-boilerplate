import API from 'lib/api';
import Model from 'lib/component-model';

export default class PageTypeTodoExampleModel extends Model {
  load() {
    API
     .get('/api/components/PageTypeTodoExample')
     .then(data => this.setState(data));
  }
}

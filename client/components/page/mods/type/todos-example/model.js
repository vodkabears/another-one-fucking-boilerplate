import API from 'lib/api';
import Model from 'lib/component-model';

export default class PageTypeTodosExampleModel extends Model {
  load() {
    API
     .get('/api/components/PageTypeTodosExample')
     .then(data => this.setState(data));
  }
}

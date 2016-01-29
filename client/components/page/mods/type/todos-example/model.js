import API from 'lib/api';
import Model from 'lib/component-model';

export default class PageTypeTodosExampleModel extends Model {
  load() {
    this.setState({ isLoading: true });

    API
     .get('/api/components/PageTypeTodosExample')
     .then(state => {
       state.isLoading = false;
       this.setState(state);
     });
  }
}

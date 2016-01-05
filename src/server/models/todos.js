import uuid from 'node-uuid';

export default class Todos {
  /**
   * @param {Object} request
   * @returns {Object}
   */
  static get(request) {
    return request.session.todos || [];
  }

  /**
   * @param {Object} request
   * @param {Object|Object[]} items
   * @returns {Object[]}
   */
  static add(request, items) {
    Array.isArray(items) || (items = [items]);

    if (!items[0]) {
      return;
    }

    items = items.map(item => {
      let text = item.text;

      return {
        id: uuid.v1(),
        text: text ? text.trim() : '',
        isCompleted: item.isCompleted
      };
    });

    let session = request.session;
    let todos = session.todos;

    !todos && (todos = session.todos = []);
    todos.push(...items);

    return todos;
  }

  /**
   * @param {Object} request
   * @param {Object} update
   * @param {String|String[]} ids
   * @returns {Object[]}
   */
  static update(request, update, ids) {
    Array.isArray(ids) || (ids = [ids]);

    if (!update || !ids[0]) {
      return;
    }

    let todos = request.session.todos;
    let updateParams = Object.keys(update);

    return todos ? todos.map(todo => {
      if (ids.includes(todo.id)) {
        let hasOwnProperty = Object.hasOwnProperty.bind(todo);

        updateParams.forEach(paramToUpdate => {
          if (hasOwnProperty(paramToUpdate)) {
            todo[paramToUpdate] = update[paramToUpdate];
          }
        });
      }

      return todo;
    }) : [];
  }

  /**
   * @param {Object} request
   * @param {String|String[]} ids
   */
  static remove(request, ids) {
    Array.isArray(ids) || (ids = [ids]);

    if (!ids[0]) {
      return;
    }

    let session = request.session;
    let todos = session.todos;

    todos = session.todos = todos && todos.filter(todo => !ids.includes(todo.id));

    return todos ? todos : [];
  }
}

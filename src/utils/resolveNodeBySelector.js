import { type } from './type';

/**
 * object select resolver
 *
 * @example
 *  const a = {b: 1};
 *  resolveNodeBySelector('a.b', a).then(b => 1)
 *
 * @param selector
 * @param root default is window
 * @returns {Promise}
 */
export function resolveNodeBySelector(selector, root = window) {
  return new Promise((resolve, reject) => {
    if (!type.string(selector)) {
      reject('Selector not valid string');
    }

    if (!type.object(root)) {
      reject('Root not valid object');
    }

    const route = String(selector).split('.');
    let node = root;

    try {
      let index = 0;
      let length = route.length;

      do {
        let key = route[index];
        node = node[key];
        index++;
      } while (index < length);
    } catch (error) {
      reject(error);
    }

    if (type.valid(node)) {
      resolve(node);
    } else {
      reject('Not node found');
    }
  });
}

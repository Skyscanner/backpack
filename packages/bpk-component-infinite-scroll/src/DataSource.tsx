/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



class DataSource {
  listeners;

  constructor() {
    this.listeners = [];
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  fetchItems(index, nElements) {
    throw new Error('Not implemented');
  }

  onDataChange(callback) {
    if (this.listeners.indexOf(callback) === -1) {
      this.listeners.push(callback);
      return true;
    }
    return false;
  }

  removeListener(callback) {
    const index = this.listeners.indexOf(callback);
    if (index !== -1) {
      this.listeners.splice(index, 1);
      return true;
    }
    return false;
  }

  triggerListeners = (...args) => {
    this.listeners.forEach((cb) => cb(...args));
  };
}

export class ArrayDataSource extends DataSource {
  elements;

  constructor(elementsArray) {
    super();
    this.elements = elementsArray;
  }

  fetchItems(index, nElements) {
    const { elements } = this;
    return new Promise((resolve) => {
      const totalElements = elements.length;
      const n = totalElements - index;
      if (n <= 0) {
        return resolve([]);
      }
      const start = Math.max(index, 0);
      const end = Math.max(start, start + nElements);
      return resolve(elements.slice(start, end));
    });
  }

  updateData(newElementsArray) {
    this.elements = newElementsArray;
    this.triggerListeners();
  }
}

export default DataSource;

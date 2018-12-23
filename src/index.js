class MyArray {
  constructor(...rest) {
    if (rest.length === 1 && typeof rest[0] === 'number') {
      this.length = rest[0];
    } else {
      for (let i = 0; i < rest.length; i++) {
        this[i] = rest[i];
      }
      this.length = arguments.length;
    }
  }

  * iterator() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }

  [Symbol.iterator]() {
    return this.iterator();
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }

    const deleteEl = this[this.length - 1];
    delete this[this.length - 1];
    this.length = this.length - 1;
    return deleteEl;
  }
  push(...rest) {
    for (let i = 0; i < rest.length; i++) {
      this[this.length] = rest[i];
      this.length = this.length + 1;
    }

    return this.length;
  }

  static from(obj, callback, thisArg) {
    const arrFrom = new MyArray();
    const self = thisArg ? thisArg : this;

    if (obj && typeof callback === 'function' && thisArg) {
      for (let i = 0; i < obj.length; i++) {
        arrFrom.length += 1;
        arrFrom[i] = callback.call(self, obj[i], i, obj);
      }
    } else if (obj && typeof callback === 'function') {
      for (let i = 0; i < obj.length; i++) {
        arrFrom.length += 1;
        arrFrom[i] = callback(obj[i], i, obj);
      }
    } else if (obj) {
      for (let i = 0; i < obj.length; i++) {
        arrFrom[i] = obj[i];
        arrFrom.length += 1;
      }
    }

    return arrFrom;
  }

  toString() {
    let str = '';

    for (let i = 0; i < this.length; i++) {
      if (i === this.length - 1) {
        str += this[i];
        break;
      }
      str += `${this[i]},`;
    }
    return str;
  }

  filter(callback, thisArg) {
    const arrFilter = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        arrFilter.push(this[i]);
      }
    }

    return arrFilter;
  }

  forEach(callback, thisArg) {
    const self = thisArg ? thisArg : this;

    if (typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        callback.call(self, this[i], i, this);
      }
    } else {
      throw new TypeError('callback is not a function');
    }
  }
  map(callback, thisArg) {
    const mapArr = new MyArray();

    if (arguments.length > 0 && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        mapArr[i] = callback.call(thisArg, this[i], i, this);
        mapArr.length += 1;
      }
    } else {
      throw new TypeError('callback is not a function');
    }

    return mapArr;
  }
  reduce(callback, initialValue) {
    if (this.length === 0 && !initialValue) {
      throw new TypeError('array is empty and initialValue not set!');
    } else if (this.length === 1 && !initialValue) {
      return this[0];
    } else if (this.length === 0 && initialValue) {
      return initialValue;
    }

    let accumulator = initialValue || initialValue !== undefined ? initialValue : this[0];
    let i = initialValue || initialValue !== undefined ? 0 : 1;

    for (i; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
  }

  sort(callback) {
    if (callback) {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - 1; j++) {
          if (callback(this[j], this[j + 1]) > 0) {
            const max = this[j];
            this[j] = this[j + 1];
            this[j + 1] = max;
          }
        }
      }
    } else if (arguments.length === 0) {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - i; j++) {
          if (`${this[j]}` > `${this[j + 1]}`) {
            const max = this[j];
            this[j] = this[j + 1];
            this[j + 1] = max;
          }
        }
      }
    } else {
      throw new TypeError('callback is not a function');
    }
    return this;
  }

  find(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  }

  slice(begin, end) {
    const arr = new MyArray();
    let start = begin && begin !== undefined ? begin : 0;
    let finish = end && end !== undefined ? end : this.length;

    start = begin < 0 ? this.length + begin : start;
    finish = end < 0 ? this.length + end : finish;

    for (let i = start; i < finish; i++) {
      arr.push(this[i]);
    }
    return arr;
  }
}
export default MyArray;

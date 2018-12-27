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

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
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

    for (let i = 0; i < obj.length; i++) {
      if (obj && typeof callback === 'function') {
        arrFrom[i] = callback.call(thisArg, obj[i], i, obj);
      } else if (obj) {
        arrFrom[i] = obj[i];
      }
      arrFrom.length += 1;
    }

    return arrFrom;
  }

  toString() {
    let string = this.length === 0 ? '' : this[0];

    for (let i = 1; i < this.length; i++) {
      string += `,${this[i]}`;
    }

    return string;
  }

  filter(callback, thisArg) {
    const arrFilter = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        arrFilter[arrFilter.length] = this[i];
        arrFilter.length += 1;
      }
    }

    return arrFilter;
  }

  forEach(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  map(callback, thisArg) {
    const mapArr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      mapArr[i] = callback.call(thisArg, this[i], i, this);
      mapArr.length += 1;
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
    for (let i = 0; i < this.length - 1; i++) {
      for (let j = 0; j < this.length - 1; j++) {
        if (callback && callback(this[j], this[j + 1]) > 0) {
          const max = this[j];
          this[j] = this[j + 1];
          this[j + 1] = max;
        } else if (!callback && `${this[j]}` > `${this[j + 1]}`) {
          const max = this[j];
          this[j] = this[j + 1];
          this[j + 1] = max;
        }
      }
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
    let start = begin ? begin : 0;
    let finish = end ? end : this.length;

    start = begin < 0 ? this.length + begin : start;
    finish = end < 0 ? this.length + end : finish;

    for (let i = start; i < finish; i++) {
      arr.push(this[i]);
    }
    return arr;
  }
}

export default MyArray;

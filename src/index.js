class MyArray {
  constructor(...args) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = args[0];
    } else {
      for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
      }
      this.length = args.length;
    }
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }

  pop() {
    if (this.length === 0) {
      return;
    }

    const deleteEl = this[this.length - 1];
    delete this[this.length - 1];
    this.length -= 1;
    return deleteEl;
  }

  push(...args) {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }

    return this.length;
  }

  static from(obj, callback, thisArg) {
    const arrFrom = new MyArray();

    for (let i = 0; i < obj.length; i++) {
      if (typeof callback === 'function') {
        arrFrom[i] = callback.call(thisArg, obj[i], i, obj);
      } else {
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
    } else if (this.length === 0 && initialValue) {
      return initialValue;
    }

    let accumulator = initialValue !== undefined ? callback(initialValue, this[0], 0, this) : this[0];

    for (let i = 1; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
  }

  sort(callback) {
    for (let i = 0; i < this.length - 1; i++) {
      for (let j = 0; j < this.length - 1; j++) {
        const check = callback ? callback(this[j], this[j + 1]) > 0 : `${this[j]}` > `${this[j + 1]}`;

        if (check) {
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
  }

  slice(begin, end) {
    const arr = new MyArray();

    const start = begin < 0 ? this.length + begin : begin || 0;
    const finish = end < 0 ? this.length + end : end || this.length;

    for (let i = start; i < finish; i++) {
      arr[arr.length] = this[i];
      arr.length += 1;
    }
    return arr;
  }
}

export default MyArray;


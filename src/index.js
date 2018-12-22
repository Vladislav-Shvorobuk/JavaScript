class MyArray {
  constructor(...rest) {
    for (let i = 0; i < rest.length; i++) {
      this[i] = rest[i];
    }
    this.length = arguments.length;
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

  static from(...rest) {
    const arrFrom = new MyArray();

    if (rest[1] && typeof rest[1] === 'function') {
      for (let i = 0; i < rest[0].length; i++) {
        arrFrom[i] = rest[0][i];
        arrFrom.length += 1;
        arrFrom[i] = rest[1](arrFrom[i], i, arrFrom);
      }
    } else if (rest[0].size) {
      let count = -1;

      for (const couple of rest[0]) {
        arrFrom[count += 1] = couple;
        arrFrom.length += 1;
      }
    } else if (rest[0].length) {
      for (let i = 0; i < rest[0].length; i++) {
        arrFrom[i] = rest[0][i];
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

  filter(callback) {
    const arrFilter = new MyArray();

    if (arguments.length > 0 && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
          arrFilter[i] = this[i];
          arrFilter.length += 1;
        }
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
  map(callback) {
    const mapArr = new MyArray();

    if (arguments.length > 0 && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        mapArr[i] = callback(this[i], i, this);
        mapArr.length += 1;
      }
    }

    return mapArr;
  }
  reduce(callback, currentValue = 0) {
    let result = currentValue;

    if (arguments.length > 0 && typeof callback === 'function') {
      for (let i = 0; i < this.length; i++) {
        result = callback(result, this[i], i, this);
      }
    }

    return result;
  }

  sort(callback) {
    if (arguments.length === 1 && typeof callback === 'function') {
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
    }
    return this;
  }
}
export default MyArray;

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

  filter(callback, thisArg = this) {
    const arrFilter = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, thisArg)) {
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
}
export default MyArray;

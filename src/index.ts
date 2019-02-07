class MyArray <T>{
  length: number;
  [key: number]: T;

  constructor (...args: T[] | number[]) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = <number>args[0];
    } else {
      for (let i: number = 0; i < args.length; i++) {
        this[i] = <T>args[i];
      }
      this.length = args.length;
    }
  }

  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }

  pop(): T | undefined {
    if (this.length === 0) {
      return;
    }

    const deleteEl = this[this.length - 1];
    delete this[this.length - 1];
    this.length -= 1;
    return deleteEl;
  }

  push(...args: T[]): number {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }

    return this.length;
  }

  static from<T>(arrayLike: any, mappFn: (element?: T, index?: number, array?: any) => MyArray<any>, thisArg?: any): MyArray<T> {
    const arrFrom = new MyArray<T>();

    for (let i = 0; i < arrayLike.length; i++) {
      if (typeof mappFn === 'function') {
        arrFrom[i] = mappFn.call(thisArg, arrayLike[i], i, arrayLike);
      } else {
        arrFrom[i] = arrayLike[i];
      }
      arrFrom.length += 1;
    }

    return arrFrom;
  }

  toString(): string {
    let string: string = this.length === 0 ? '' : `${this[0]}`;

    for (let i = 1; i < this.length; i++) {
      string += `,${this[i]}`;
    }

    return string;
  }

  filter(callback: (element: T, index: number, array: MyArray<T>) => T, thisArg?: any) {
    const arrFilter = new MyArray<T>();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        arrFilter[arrFilter.length] = this[i];
        arrFilter.length += 1;
      }
    }

    return arrFilter;
  }

  forEach(callback: (element?: T, index?: number, array?: MyArray<T>) => void, thisArg?: any): void {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  map<U>(callback: (element: T, index: number, array: MyArray<T>) => any, thisArg?: any): MyArray<U> {
    const mapArr = new MyArray<U>();

    for (let i = 0; i < this.length; i++) {
      mapArr[i] = callback.call(thisArg, this[i], i, this);
      mapArr.length += 1;
    }

    return mapArr;
  }

  reduce(callback: (accumulator: T, currentValue: T, index: number, array: MyArray<T>) => T, initialValue?: T): T {
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

  sort(callback?: (a: T, b: T) => number): this {
    const cb = callback ? callback : (a: T, b: T) => `${a}` > `${b}`;

    for (let i = 0; i < this.length - 1; i++) {
      for (let j = 0; j < this.length - 1; j++) {
        if (cb(this[j], this[j + 1]) > 0) {
          const max = this[j];
          this[j] = this[j + 1];
          this[j + 1] = max;
        }
      }
    }
    return this;
  }

  find(callback: (element: T, index: number, array: MyArray<T>) => boolean, thisArg?: any): T | undefined {
    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }

  slice(begin?: number, end?: number): MyArray<T> {
    const arr = new MyArray<T>();

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


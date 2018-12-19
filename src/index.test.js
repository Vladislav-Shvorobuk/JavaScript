import MyArray from './index';

describe('Class MyArray', () => {

  describe('Tests for method toString', () => {

    let arr;

    beforeEach(() => {
      arr = new MyArray(1, 2, 3, 4);
    });

    test('instance has method toString', ()=> {
      expect(arr.toString).toBeInstanceOf(Function);
    });

    test('instance has not Own Property toString', ()=> {
      expect(arr.hasOwnProperty('toString')).toBeFalsy();
    });

    test('the toString result of empty arr must be an empty string and not undefined', ()=> {
      arr = new MyArray(0);
      expect(arr.toString()).toMatch('');
      expect(arr.toString()).not.toBeUndefined();
    });

})



});
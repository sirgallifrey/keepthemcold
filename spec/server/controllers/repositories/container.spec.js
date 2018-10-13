const containers = require('../../../../src/server/repositories/containers');

describe('validate', () => {

  describe('with valid data', () => {
    it('wont throw if is valid', () => {
      containers.validate({
        id: 1,
        label: 'abc',
        minTemperature: 2,
        maxTemperature: 6,
      });
    });
  });

  describe('with invalid data', () => {
    describe('id', () => {
      it('throw if id is missing', () => {
        expect(() => {
          containers.validate({
            label: 'abc',
            minTemperature: 2,
            maxTemperature: 6,
          });
        }).toThrowError('child "id" fails because ["id" is required]');
      });

      it('throw if id is not a number', () => {
        expect(() => {
          containers.validate({
            id: 'abc',
            label: 'abc',
            minTemperature: 2,
            maxTemperature: 6,
          });
        }).toThrowError('child "id" fails because ["id" must be a number]');
      });

      it('throw if id is not a integer', () => {
        expect(() => {
          containers.validate({
            id: 1.3,
            label: 'abc',
            minTemperature: 2,
            maxTemperature: 6,
          });
        }).toThrowError('child "id" fails because ["id" must be an integer]');
      });
    });

    describe('label', () => {
      it('throw if label is missing', () => {
        expect(() => {
          containers.validate({
            id: 2,
            minTemperature: 2,
            maxTemperature: 6,
          });
        }).toThrowError('child "label" fails because ["label" is required]');
      });

      it('throw if label is not a string', () => {
        expect(() => {
          containers.validate({
            id: 2,
            label: 30,
            minTemperature: 2,
            maxTemperature: 6,
          });
        }).toThrowError('child "label" fails because ["label" must be a string]');
      });
    });


    describe('minTemperature', () => {
      it('throw if minTemperature is missing', () => {
        expect(() => {
          containers.validate({
            id: 4,
            label: 'abc',
            maxTemperature: 6,
          });
        }).toThrowError('child "minTemperature" fails because ["minTemperature" is required]');
      });

      it('throw if minTemperature is not a number', () => {
        expect(() => {
          containers.validate({
            id: 4,
            label: 'abc',
            minTemperature: 'abc',
            maxTemperature: 6,
          });
        }).toThrowError('child "minTemperature" fails because ["minTemperature" must be a number]');
      });
    });

    describe('maxTemperature', () => {
      it('throw if maxTemperature is missing', () => {
        expect(() => {
          containers.validate({
            id: 4,
            label: 'abc',
            minTemperature: 6,
          });
        }).toThrowError('child "maxTemperature" fails because ["maxTemperature" is required]');
      });

      it('throw if maxTemperature is not a number', () => {
        expect(() => {
          containers.validate({
            id: 4,
            label: 'abc',
            minTemperature: 6,
            maxTemperature: 'abc',
          });
        }).toThrowError('child "maxTemperature" fails because ["maxTemperature" must be a number]');
      });
    });
  });
});

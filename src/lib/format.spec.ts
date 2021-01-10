import { formatSteps } from './format';

describe('formatSteps', () => {
  it('should format a 3 digit number', () => {
    expect(formatSteps(507)).toEqual('507');
  });

  it('should format a 4 digit number', () => {
    expect(formatSteps(5071)).toEqual('5,071');
  });

  it('should format a 5 digit number', () => {
    expect(formatSteps(50716)).toEqual('50,716');
  });
});

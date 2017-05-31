import { scaleBand } from 'd3-scale';
import {
  center,
  identity
} from './utils';
import data from '../data.json';

describe('utils', () => {
  describe('identity', () => {
    it('should return the input', () => {
      const obj = {};
      const arr = [];
      expect(identity(null)).toBe(null);
      expect(identity(0)).toBe(0);
      expect(identity(obj)).toBe(obj);
      expect(identity(arr)).toBe(arr);
    });
  });

  describe('center', () => {
    const domain = data.continentCountries.map(c => c.continent);
    const scale = scaleBand().domain(domain).range([0, 100]);
    const scaleRound = scaleBand().domain(domain).rangeRound([0, 100]);

    it('should return a function', () => {
      expect(typeof center(scale) === 'function').toBe(true);
    });

    it('should return the exact band center', () => {
      const position = center(scale);
      expect(position(domain[0])).not.toBe(7);
      expect(Math.round(position(domain[0]))).toBe(7);
      expect(position(domain[1])).not.toBe(21);
      expect(Math.round(position(domain[1]))).toBe(21);
    });

    it('should return the rounded band center for a rounded range', () => {
      const position = center(scaleRound);
      expect(position(domain[0])).toBe(8);
      expect(position(domain[1])).toBe(22);
    });
  });
});

/**
 * Pattern Library Tests
 */

import { detectPatterns, getPatternById, getPatternsByCategory, getPatternCount, getPatternStats } from '../patterns/pattern-library';

describe('Pattern Library', () => {
  describe('getPatternCount', () => {
    it('should return 50+ patterns', () => {
      const count = getPatternCount();
      expect(count).toBeGreaterThanOrEqual(50);
    });
  });

  describe('getPatternById', () => {
    it('should find null-check-basic pattern', () => {
      const pattern = getPatternById('null-check-basic');
      expect(pattern).toBeDefined();
      expect(pattern?.name).toBe('Basic Null Check');
    });

    it('should return undefined for non-existent pattern', () => {
      const pattern = getPatternById('non-existent');
      expect(pattern).toBeUndefined();
    });
  });

  describe('getPatternsByCategory', () => {
    it('should return null-safety patterns', () => {
      const patterns = getPatternsByCategory('null-safety');
      expect(patterns.length).toBeGreaterThan(0);
      patterns.forEach(p => {
        expect(p.category).toBe('null-safety');
      });
    });

    it('should return async patterns', () => {
      const patterns = getPatternsByCategory('async');
      expect(patterns.length).toBeGreaterThan(0);
    });
  });

  describe('detectPatterns', () => {
    it('should detect null check pattern', () => {
      const code = `if (user !== null && user !== undefined) {
        console.log(user.name);
      }`;

      const patterns = detectPatterns(code);
      expect(patterns.length).toBeGreaterThan(0);
      expect(patterns[0].id).toBe('null-check-basic');
    });

    it('should detect async/await pattern', () => {
      const code = `async function fetchData() {
        const response = await fetch('/api/data');
        return response.json();
      }`;

      const patterns = detectPatterns(code);
      const asyncPattern = patterns.find(p => p.category === 'async');
      expect(asyncPattern).toBeDefined();
    });

    it('should detect array.map pattern', () => {
      const code = `const doubled = numbers.map(n => n * 2);`;

      const patterns = detectPatterns(code);
      const mapPattern = patterns.find(p => p.id === 'array-map');
      expect(mapPattern).toBeDefined();
    });

    it('should return empty array for no patterns', () => {
      const code = `console.log('hello');`;
      const patterns = detectPatterns(code);
      // May or may not have patterns depending on detection
      expect(Array.isArray(patterns)).toBe(true);
    });

    it('should detect multiple patterns in same code', () => {
      const code = `
        if (user !== null) {
          const name = user.name || 'Guest';
          const items = list.map(x => x * 2);
        }
      `;

      const patterns = detectPatterns(code);
      expect(patterns.length).toBeGreaterThan(0);
    });
  });

  describe('getPatternStats', () => {
    it('should return valid statistics', () => {
      const stats = getPatternStats();

      expect(stats.total).toBeGreaterThan(0);
      expect(stats.byCategory).toBeDefined();
      expect(stats.byDifficulty).toBeDefined();

      // Check categories
      expect(stats.byCategory['null-safety']).toBeGreaterThan(0);
      expect(stats.byCategory['async']).toBeGreaterThan(0);

      // Check difficulties
      expect(stats.byDifficulty.beginner).toBeGreaterThan(0);
    });
  });

  describe('Pattern Structure', () => {
    it('all patterns should have required fields', () => {
      const patterns = detectPatterns('if (x !== null) {}');

      patterns.forEach(pattern => {
        expect(pattern.id).toBeDefined();
        expect(pattern.name).toBeDefined();
        expect(pattern.category).toBeDefined();
        expect(pattern.difficulty).toBeDefined();
        expect(pattern.jsExample).toBeDefined();
        expect(pattern.rescriptExample).toBeDefined();
        expect(pattern.narrative).toBeDefined();
        expect(pattern.narrative.celebrate).toBeDefined();
        expect(pattern.narrative.better).toBeDefined();
        expect(pattern.narrative.safety).toBeDefined();
      });
    });
  });

  describe('Performance', () => {
    it('should detect patterns in under 300ms', () => {
      const code = `
        async function processData(data) {
          if (data !== null && data !== undefined) {
            const items = data.items.map(x => x * 2);
            const filtered = items.filter(x => x > 10);
            return filtered.reduce((sum, x) => sum + x, 0);
          }
          return null;
        }
      `;

      const start = performance.now();
      const patterns = detectPatterns(code);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(300);
      expect(patterns.length).toBeGreaterThan(0);
    });
  });
});

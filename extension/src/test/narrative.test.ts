/**
 * Narrative Generation Tests
 */

import { generateNarrative, formatNarrative, generateSuccessMessage, generateHint, personalizeNarrative } from '../narrative';
import { Pattern } from '../types';

describe('Narrative Generation', () => {
  const mockPattern: Pattern = {
    id: 'test-pattern',
    name: 'Test Pattern',
    category: 'null-safety',
    difficulty: 'beginner',
    jsPattern: /test/,
    confidence: 0.9,
    jsExample: 'test',
    rescriptExample: 'test',
    narrative: {
      celebrate: 'Great job!',
      minimize: 'Small thing...',
      better: 'Even better with ReScript!',
      safety: 'Type-safe!',
      example: 'Example here'
    },
    glyphs: ['🛡️'],
    tags: ['test'],
    relatedPatterns: [],
    learningObjectives: ['Test objective'],
    commonMistakes: ['Test mistake'],
    bestPractices: ['Test practice']
  };

  describe('generateNarrative', () => {
    it('should return pattern narrative if available', () => {
      const narrative = generateNarrative(mockPattern);
      expect(narrative).toEqual(mockPattern.narrative);
    });

    it('should generate narrative for pattern without one', () => {
      const patternWithoutNarrative = { ...mockPattern, narrative: undefined as any };
      const narrative = generateNarrative(patternWithoutNarrative);

      expect(narrative.celebrate).toBeDefined();
      expect(narrative.better).toBeDefined();
      expect(narrative.safety).toBeDefined();
    });
  });

  describe('formatNarrative', () => {
    it('should format as plain text', () => {
      const formatted = formatNarrative(mockPattern.narrative, 'plain');

      expect(formatted).toContain(mockPattern.narrative.celebrate);
      expect(formatted).toContain(mockPattern.narrative.better);
      expect(formatted).not.toContain('<');
    });

    it('should format as markdown', () => {
      const formatted = formatNarrative(mockPattern.narrative, 'markdown');

      expect(formatted).toContain('**');
      expect(formatted).toContain(mockPattern.narrative.celebrate);
    });

    it('should format as HTML', () => {
      const formatted = formatNarrative(mockPattern.narrative, 'html');

      expect(formatted).toContain('<div');
      expect(formatted).toContain('class="narrative"');
      expect(formatted).toContain(mockPattern.narrative.celebrate);
    });
  });

  describe('generateSuccessMessage', () => {
    it('should generate success message', () => {
      const message = generateSuccessMessage('Test Pattern', 'beginner');

      expect(message).toBeDefined();
      expect(message.length).toBeGreaterThan(0);
      expect(message).toContain('Test Pattern');
    });
  });

  describe('generateHint', () => {
    it('should generate hint from pattern', () => {
      const hint = generateHint(mockPattern);

      expect(hint).toBeDefined();
      expect(hint.length).toBeGreaterThan(0);
    });
  });

  describe('personalizeNarrative', () => {
    it('should add username to narrative', () => {
      const personalized = personalizeNarrative(mockPattern.narrative, 'Alice');

      expect(personalized.celebrate).toContain('Alice');
    });

    it('should work without username', () => {
      const personalized = personalizeNarrative(mockPattern.narrative);

      expect(personalized.celebrate).toBeDefined();
    });
  });

  describe('Narrative Quality', () => {
    it('should never shame developers', () => {
      const narrative = generateNarrative(mockPattern);

      const shamingWords = ['wrong', 'bad', 'terrible', 'stupid', 'dumb', 'awful'];
      const text = Object.values(narrative).join(' ').toLowerCase();

      shamingWords.forEach(word => {
        expect(text).not.toContain(word);
      });
    });

    it('should be encouraging', () => {
      const narrative = generateNarrative(mockPattern);

      const encouragingWords = ['great', 'good', 'nice', 'excellent', 'perfect', 'smart'];
      const celebrate = narrative.celebrate.toLowerCase();

      const hasEncouragement = encouragingWords.some(word => celebrate.includes(word));
      expect(hasEncouragement).toBe(true);
    });
  });
});

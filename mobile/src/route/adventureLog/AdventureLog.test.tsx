import { formatDate, capitalize } from './helper';

describe('adventureLog helpers', () => {
  it('formatDate returns a non-empty string', () => {
    const result = formatDate(new Date('2026-05-30'));
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('capitalize uppercases the first letter', () => {
    expect(capitalize('sexta-feira')).toBe('Sexta-feira');
  });
});

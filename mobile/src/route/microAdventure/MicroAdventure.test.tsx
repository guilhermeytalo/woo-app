import { render } from '@testing-library/react-native';

import MicroAdventure from './MicroAdventure';
import { CHALLENGES } from './helper';

describe('MicroAdventure', () => {
  it('renders without crashing', () => {
    expect(() => render(<MicroAdventure />)).not.toThrow();
  });

  it('has exactly 4 challenges', () => {
    expect(CHALLENGES).toHaveLength(4);
  });

  it('all challenges have id, emoji, and text', () => {
    for (const c of CHALLENGES) {
      expect(c.id).toBeTruthy();
      expect(c.emoji).toBeTruthy();
      expect(c.text).toBeTruthy();
    }
  });
});

import { render } from '@testing-library/react-native';

import ModeSelection from './ModeSelection';
import { MODES } from './helper';

describe('ModeSelection', () => {
  it('renders without crashing', () => {
    expect(() => render(<ModeSelection />)).not.toThrow();
  });

  it('has exactly 4 modes', () => {
    expect(MODES).toHaveLength(4);
  });

  it('includes all expected mode keys', () => {
    const keys = MODES.map((m) => m.key);
    expect(keys).toEqual(['individual', 'casal', 'familia', 'amigos']);
  });
});

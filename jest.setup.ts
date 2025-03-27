import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'text-encoding';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

globalThis.matchMedia = (query) => ({
  matches: false, 
  media: query,
  onchange: null,
  addListener: () => {}, 
  removeListener: () => {}, 
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
});
import test from 'node:test';
import assert from 'node:assert/strict';
import { isRateLimited, sanitizeHeader } from './contact.js';

test('contact helpers sanitize headers and limit repeated requests', () => {
  assert.equal(sanitizeHeader(' Igor\r\nBcc: victim@example.com '), 'IgorBcc: victim@example.com');

  const ip = `test-${Date.now()}`;
  for (let request = 0; request < 5; request += 1) {
    assert.equal(isRateLimited(ip, 0), false);
  }
  assert.equal(isRateLimited(ip, 0), true);
  assert.equal(isRateLimited(ip, 15 * 60 * 1000 + 1), false);
});
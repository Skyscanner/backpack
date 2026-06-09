/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import portalLock from './portalLock';

describe('portalLock', () => {
  beforeEach(() => {
    portalLock.resetForTesting();
  });

  it('is not locked by default', () => {
    expect(portalLock.isLocked()).toBe(false);
  });

  it('is locked after lock() is called', () => {
    portalLock.lock();
    expect(portalLock.isLocked()).toBe(true);
  });

  it('is not locked after lock() then unlock()', () => {
    portalLock.lock();
    portalLock.unlock();
    expect(portalLock.isLocked()).toBe(false);
  });

  it('requires matching unlock() calls when locked multiple times (nested modals)', () => {
    portalLock.lock();
    portalLock.lock();
    portalLock.unlock();
    expect(portalLock.isLocked()).toBe(true);

    portalLock.unlock();
    expect(portalLock.isLocked()).toBe(false);
  });

  it('does not go below zero when unlock() is called without a prior lock()', () => {
    portalLock.unlock();
    expect(portalLock.isLocked()).toBe(false);

    // A subsequent lock/unlock pair should still work correctly.
    portalLock.lock();
    expect(portalLock.isLocked()).toBe(true);
    portalLock.unlock();
    expect(portalLock.isLocked()).toBe(false);
  });
});

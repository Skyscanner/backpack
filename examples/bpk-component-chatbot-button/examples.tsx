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

import { useEffect, useRef, useState } from 'react';

import BpkButton, { BUTTON_TYPES } from '../../packages/bpk-component-button';
import BpkChatbotButton from '../../packages/bpk-component-chatbot-button';
import StarIcon from '../../packages/bpk-component-icon/lg/star';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../packages/bpk-component-text';

export const DefaultExample = () => (
  <BpkChatbotButton label="Chat with AI" onClick={() => {}} />
);

export const ExpandedExample = () => (
  <BpkChatbotButton label="Chat with AI" expanded onClick={() => {}} />
);

export const DisabledExample = () => (
  <BpkChatbotButton label="Chat with AI" disabled onClick={() => {}} />
);

const POLLING_DURATION_MS = 5000;

type PollingStatus = 'idle' | 'polling' | 'done';

// Simulates the car-hire trigger chain:
//   isPolling=true  →  isAnimate=true  →  button expands 2 s then auto-collapses
//   isPolling=false →  isAnimate=false →  button stays collapsed
export const AnimatedExample = () => {
  const [status, setStatus] = useState<PollingStatus>('idle');
  const [chatOpen, setChatOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const isPolling = status === 'polling';

  const startSearch = () => {
    if (isPolling) return;
    setChatOpen(false);
    setStatus('polling');
    timerRef.current = setTimeout(() => {
      setStatus('done');
    }, POLLING_DURATION_MS);
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setStatus('idle');
    setChatOpen(false);
  };

  // clean up on unmount
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const statusLabel: Record<PollingStatus, string> = {
    idle: 'Idle — press "Start search" to simulate polling',
    polling: 'Searching… (button will expand then auto-collapse)',
    done: 'Results ready — polling ended, button stays collapsed',
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '220px',
        background: 'var(--bpk-canvas-contrast-day)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Status banner */}
      <div
        style={{
          background: 'var(--bpk-canvas-day)',
          borderRadius: '8px',
          padding: '0.5rem 0.75rem',
          border: '1px solid var(--bpk-line-day)',
        }}
      >
        <BpkText textStyle={TEXT_STYLES.caption} color={TEXT_COLORS.textSecondary}>
          <strong>Status:</strong> {statusLabel[status]}
        </BpkText>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <BpkButton disabled={isPolling} onClick={startSearch}>
          Start search
        </BpkButton>
        <BpkButton buttonType={BUTTON_TYPES.secondary} onClick={reset}>
          Reset
        </BpkButton>
      </div>

      {chatOpen && (
        <BpkText textStyle={TEXT_STYLES.caption} color={TEXT_COLORS.textLink}>
          Chatbot opened ✓
        </BpkText>
      )}

      {/* Chatbot button — positioned bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
        }}
      >
        <BpkChatbotButton
          label="Chat with AI"
          isAnimate={isPolling}
          onClick={() => setChatOpen(true)}
        />
      </div>
    </div>
  );
};

export const ControlledExample = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <BpkChatbotButton
      label="Chat with AI"
      expanded={expanded}
      onClick={() => setExpanded((prev) => !prev)}
    />
  );
};

export const CustomIconExample = () => (
  <BpkChatbotButton
    label="Quick search"
    icon={<StarIcon fill="white" aria-hidden="true" />}
    onClick={() => {}}
  />
);

export const VisualTestExample = () => (
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      padding: '2rem',
      background: 'var(--bpk-canvas-contrast-day)',
    }}
  >
    <BpkChatbotButton label="Chat with AI" onClick={() => {}} />
    <BpkChatbotButton label="Chat with AI" expanded onClick={() => {}} />
    <BpkChatbotButton label="Chat with AI" disabled onClick={() => {}} />
  </div>
);

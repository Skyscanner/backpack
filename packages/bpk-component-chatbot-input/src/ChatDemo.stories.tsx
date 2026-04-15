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

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import BpkButton, { BUTTON_TYPES } from '../../bpk-component-button';
import BpkChatBubble from '../../bpk-component-chat-bubble/src/BpkChatBubble';
import { CHAT_BUBBLE_TYPE } from '../../bpk-component-chat-bubble/src/common-types';
import BpkChatNotification from '../../bpk-component-chat-notification/src/BpkChatNotification';
import BpkChatThoughtBubble from '../../bpk-component-chat-thought-bubble/src/BpkChatThoughtBubble';
import BpkMultiSelectChipGroup, {
  CHIP_GROUP_TYPES,
  CHIP_COMPONENT,
} from '../../bpk-component-chip-group';
import SmallPlusIcon from '../../bpk-component-icon/sm/plus';
import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';
import {
  BpkBox,
  BpkFlex,
  BpkProvider,
  BpkStack,
  BpkVStack,
  BpkSpacing,
  BACKGROUND_COLORS,
} from '../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text';
import BpkVisuallyHidden from '../../bpk-component-visually-hidden';

import BpkChatbotInput from './BpkChatbotInput';
import { CHATBOT_INPUT_TYPES } from './common-types';

import type { ThumbsButtonType } from '../../bpk-component-thumb-button';
import type { Meta } from '@storybook/react';

type Message = {
  id: number;
  type: 'user' | 'bot' | 'thinking' | 'notification' | 'suggestions';
  text: string;
  suggestions?: string[];
  position?: 'first' | 'middle' | 'last';
  showFeedback?: boolean;
};

const BOT_RESPONSES: Record<string, { thinking: string; replies: string[] }> = {
  flight: {
    thinking: 'Searching for flights...',
    replies: [
      "I'd love to help you book a flight! Where are you flying from and to?",
      "If you let me know your dates too, I can find the best deals for you.",
    ],
  },
  hotel: {
    thinking: 'Looking up hotels...',
    replies: [
      "Great choice! I can help you find a hotel. Which city are you visiting, and what are your dates?",
    ],
  },
  car: {
    thinking: 'Checking car hire options...',
    replies: [
      "I can help with car hire! Where would you like to pick up the car?",
      "Let me know the pick-up and drop-off dates and I'll find the best options.",
    ],
  },
  default: {
    thinking: 'Let me think about that...',
    replies: [
      "That's a great question! I can help with flights, hotels, and car hire. What would you like to explore?",
    ],
  },
};

const getResponse = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('flight') || lower.includes('fly')) {
    return BOT_RESPONSES.flight;
  }
  if (lower.includes('hotel') || lower.includes('stay')) {
    return BOT_RESPONSES.hotel;
  }
  if (lower.includes('car') || lower.includes('hire')) {
    return BOT_RESPONSES.car;
  }
  return BOT_RESPONSES.default;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    type: 'bot',
    text: "Hello, I'm Skyscanner's virtual travel assistant, here to help you plan the perfect trip. I can suggest great places to visit, or find you the best value flights.",
    position: 'first',
  },
  {
    id: 2,
    type: 'bot',
    text: 'What would you like me to help with?',
    position: 'last',
  },
  {
    id: 3,
    type: 'suggestions',
    text: '',
    suggestions: ['Book a flight', 'Look for a hotel', 'Hire a car'],
  },
];

const useChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedbackState, setFeedbackState] = useState<
    Record<number, ThumbsButtonType | null>
  >({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(10);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotResponse = useCallback((userText: string) => {
    const response = getResponse(userText);

    const thinkingId = nextId.current;
    nextId.current += 1;
    setMessages((prev) => [
      ...prev,
      { id: thinkingId, type: 'thinking', text: response.thinking },
    ]);

    setTimeout(() => {
      setMessages((prev) => {
        const withoutThinking = prev.filter((m) => m.id !== thinkingId);
        const newMessages: Message[] = response.replies.map((reply, i) => {
          const msgId = nextId.current;
          nextId.current += 1;

          let position: Message['position'];
          if (response.replies.length > 1) {
            if (i === 0) {
              position = 'first';
            } else if (i === response.replies.length - 1) {
              position = 'last';
            } else {
              position = 'middle';
            }
          }

          return {
            id: msgId,
            type: 'bot' as const,
            text: reply,
            position,
            showFeedback: i === response.replies.length - 1,
          };
        });
        return [...withoutThinking, ...newMessages];
      });
      setIsSending(false);
    }, 1500);
  }, []);

  const handleSubmit = useCallback(
    (text?: string) => {
      const messageText = text || inputValue;
      if (!messageText.trim()) return;

      const userMsgId = nextId.current;
      nextId.current += 1;
      setMessages((prev) => [
        ...prev.filter((m) => m.type !== 'suggestions'),
        { id: userMsgId, type: 'user', text: messageText },
      ]);
      setInputValue('');
      setIsSending(true);

      addBotResponse(messageText);
    },
    [inputValue, addBotResponse],
  );

  const handleFeedback = useCallback(
    (messageId: number, type: ThumbsButtonType) => {
      setFeedbackState((prev) => ({ ...prev, [messageId]: type }));
      const notifId = nextId.current;
      nextId.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: notifId,
          type: 'notification',
          text: 'Thanks for your feedback!',
        },
      ]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== notifId));
      }, 3000);
    },
    [],
  );

  const renderMessage = useCallback(
    (message: Message): ReactNode => {
      switch (message.type) {
        case 'user':
          return (
            <BpkChatBubble
              key={message.id}
              type={CHAT_BUBBLE_TYPE.user}
              userPosition={message.position}
            >
              {message.text}
            </BpkChatBubble>
          );

        case 'bot':
          return (
            <BpkChatBubble
              key={message.id}
              type={CHAT_BUBBLE_TYPE.bot}
              systemPosition={message.position}
              showFeedback={message.showFeedback}
              selectedFeedback={feedbackState[message.id] ?? null}
              onFeedbackClick={(type) => handleFeedback(message.id, type)}
            >
              {message.text}
            </BpkChatBubble>
          );

        case 'thinking':
          return (
            <BpkChatThoughtBubble key={message.id} content={message.text} />
          );

        case 'notification':
          return (
            <BpkFlex key={message.id} justify="center" padding={BpkSpacing.SM}>
              <BpkChatNotification text={message.text} icon={TickCircleIcon} />
            </BpkFlex>
          );

        case 'suggestions':
          return (
            <BpkVStack key={message.id} align="flex-end" gap={BpkSpacing.SM}>
              {message.suggestions?.map((suggestion) => (
                <BpkChatBubble
                  key={suggestion}
                  type={CHAT_BUBBLE_TYPE.button}
                  onSuggestionClick={() => handleSubmit(suggestion)}
                >
                  {suggestion}
                </BpkChatBubble>
              ))}
            </BpkVStack>
          );

        default:
          return null;
      }
    },
    [feedbackState, handleFeedback, handleSubmit],
  );

  return {
    messages,
    inputValue,
    isSending,
    messagesEndRef,
    setInputValue,
    handleSubmit,
    renderMessage,
  };
};

const ChatShell = ({
  inputSection,
  messages,
  messagesEndRef,
  renderMessage,
}: {
  inputSection: ReactNode;
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  renderMessage: (message: Message) => ReactNode;
}) => (
  <BpkFlex
    direction="column"
    maxWidth="24rem"
    height="44rem"
    overflow="hidden"
    backgroundColor={BACKGROUND_COLORS.canvasContrast}
  >
    <BpkFlex
      align="center"
      justify="center"
      padding={BpkSpacing.Base}
      backgroundColor={BACKGROUND_COLORS.canvas}
      shrink={0}
    >
      <BpkText textStyle={TEXT_STYLES.label1}>New chat</BpkText>
    </BpkFlex>

    <BpkBox
      padding={BpkSpacing.Base}
      flexGrow={1}
      flexShrink={1}
      flexBasis="0"
      minHeight="0rem"
      overflowY="auto"
    >
      <BpkStack gap={BpkSpacing.SM}>{messages.map(renderMessage)}</BpkStack>
      <div ref={messagesEndRef} />
    </BpkBox>

    <BpkBox padding={BpkSpacing.Base} flexShrink={0}>
      {inputSection}
    </BpkBox>
  </BpkFlex>
);

const ChatDemoExample = () => {
  const chat = useChatDemo();

  return (
    <ChatShell
      messages={chat.messages}
      messagesEndRef={chat.messagesEndRef}
      renderMessage={chat.renderMessage}
      inputSection={
        <BpkChatbotInput.Root inputType={CHATBOT_INPUT_TYPES.COMPOSER}>
          <BpkChatbotInput.Input
            inputValue={chat.inputValue}
            loadingAriaLabel="Sending message"
            sendAriaLabel="Send message"
            placeholder="Your message"
            onInputChange={chat.setInputValue}
            onInputFocus={() => {}}
            onInputBlur={() => {}}
            onSubmit={() => chat.handleSubmit()}
            isSending={chat.isSending}
          />
        </BpkChatbotInput.Root>
      }
    />
  );
};

const FAKE_FILES = [
  'boarding-pass.pdf',
  'hotel-confirmation.png',
  'itinerary.docx',
];

const ChatWithAttachmentsExample = () => {
  const chat = useChatDemo();
  const [attachments, setAttachments] = useState<string[]>([]);

  const addAttachment = () => {
    if (attachments.length >= 3) return;
    const available = FAKE_FILES.filter((f) => !attachments.includes(f));
    if (available.length === 0) return;
    setAttachments((prev) => [...prev, available[0]]);
  };

  const removeAttachment = (filename: string) => {
    setAttachments((prev) => prev.filter((f) => f !== filename));
  };

  const handleSubmit = () => {
    chat.handleSubmit();
    setAttachments([]);
  };

  return (
    <ChatShell
      messages={chat.messages}
      messagesEndRef={chat.messagesEndRef}
      renderMessage={chat.renderMessage}
      inputSection={
        <BpkChatbotInput.Root inputType={CHATBOT_INPUT_TYPES.COMPOSER}>
          {attachments.length > 0 && (
            <BpkBox width="100%" overflow="hidden">
              <BpkMultiSelectChipGroup
                type={CHIP_GROUP_TYPES.rail}
                ariaLabel="Attached files"
                leadingNudgerLabel="Scroll left"
                trailingNudgerLabel="Scroll right"
                chips={attachments.map((filename) => ({
                  text: filename,
                  component: CHIP_COMPONENT.dismissible,
                  accessibilityLabel: `Remove ${filename}`,
                  onClick: () => removeAttachment(filename),
                }))}
              />
            </BpkBox>
          )}
          <BpkChatbotInput.Input
            inputValue={chat.inputValue}
            loadingAriaLabel="Sending message"
            sendAriaLabel="Send message"
            placeholder="Your message"
            onInputChange={chat.setInputValue}
            onInputFocus={() => {}}
            onInputBlur={() => {}}
            onSubmit={handleSubmit}
            isSending={chat.isSending}
          />
          <BpkChatbotInput.Toolbar>
            <BpkButton
              type={BUTTON_TYPES.link}
              iconOnly
              onClick={addAttachment}
              disabled={attachments.length >= 3}
            >
              <SmallPlusIcon />
              <BpkVisuallyHidden>Add attachment</BpkVisuallyHidden>
            </BpkButton>
          </BpkChatbotInput.Toolbar>
        </BpkChatbotInput.Root>
      }
    />
  );
};

const meta = {
  title: 'Chat Demo',
  decorators: [
    (Story: any) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
} satisfies Meta;

export default meta;

export const InteractiveChat = {
  render: () => <ChatDemoExample />,
};

export const InteractiveChatWithAttachments = {
  render: () => <ChatWithAttachmentsExample />,
};

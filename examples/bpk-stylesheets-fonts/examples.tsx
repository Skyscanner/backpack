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

import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';

const LANGUAGE_SAMPLES = {
  english: {
    text: 'The quick brown fox jumps over the lazy dog',
  },
  vietnamese: {
    text: 'Tiếng Việt là ngôn ngữ chính thức của Việt Nam. Xin chào và chúc mừng năm mới!',
  },
  arabic: {
    text: 'صِف خَلقَ خَودِ كَمِثلِ الشَمسِ إِذ بَزَغَت — يَحظى الضَجيعُ بِها نَجلاءَ مِعطارِ',
  },
  hebrew: {
    text: 'עברית היא שפה רשמית במדינת ישראל. שלום וברכות לשנה החדשה!',
  },
  thai: {
    text: 'ภาษาไทยเป็นภาษาราชการของประเทศไทย สวัสดีและสุขสันต์วันปีใหม่',
  },
  hindi: {
    text: 'हिन्दी भारत की राजभाषा है। नमस्ते और नववर्ष की शुभकामनाएं।',
  },
  japanese: {
    text: '日本語は日本の公用語です。こんにちは、そして明けましておめでとうございます。',
  },
  korean: {
    text: '한국어는 대한민국의 공용어입니다. 안녕하세요 그리고 새해 복 많이 받으세요.',
  },
};

const SKYSCANNER_RELATIVE_WEIGHTS = [
  { weight: 400, style: 'normal' as const, label: '400' },
  { weight: 400, style: 'italic' as const, label: '400 Italic' },
  { weight: 500, style: 'normal' as const, label: '500' },
  { weight: 500, style: 'italic' as const, label: '500 Italic' },
  { weight: 700, style: 'normal' as const, label: '700' },
  { weight: 700, style: 'italic' as const, label: '700 Italic' },
  { weight: 900, style: 'normal' as const, label: '900' },
  { weight: 900, style: 'italic' as const, label: '900 Italic' },
];

const LARKEN_WEIGHTS = [
  { weight: 300, style: 'normal' as const, label: '300' },
  { weight: 400, style: 'normal' as const, label: '400' },
];

interface FontTestRowProps {
  text: string;
  fontWeight: number;
  fontStyle: 'normal' | 'italic';
  type: 'larken' | 'skyscanner';
}

const FontTestRow = ({
  fontStyle,
  fontWeight,
  text,
  type,
}: FontTestRowProps) => (
  <div>
    <BpkText
      textStyle={type === 'larken' ? TEXT_STYLES.editorial3 : TEXT_STYLES.bodyDefault}
      style={{
        fontWeight,
        fontStyle,
      }}
    >
      {text}
    </BpkText>
  </div>
);

const SkyscannerRelativeExample = () => (
  <>
    {SKYSCANNER_RELATIVE_WEIGHTS.map((config) => (
      <div key={`${config.weight}-${config.style}`}>
        <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
          Weight: {config.label}
        </BpkText>
        {Object.entries(LANGUAGE_SAMPLES).map(([key, lang]) => (
          <FontTestRow
            key={`skyscanner-${config.weight}-${config.style}-${key}`}
            text={lang.text}
            fontWeight={config.weight}
            fontStyle={config.style}
            type="skyscanner"
          />
        ))}
      </div>
    ))}
  </>
);

const LarkenExample = () => (
  <>
    {LARKEN_WEIGHTS.map((config) => (
      <div key={`${config.weight}-${config.style}`}>
        <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
          Weight: {config.label}
        </BpkText>
        {Object.entries(LANGUAGE_SAMPLES).map(([key, lang]) => (
          <FontTestRow
            key={`larken-${config.weight}-${config.style}-${key}`}
            text={lang.text}
            fontWeight={config.weight}
            fontStyle={config.style}
            type="larken"
          />
        ))}
      </div>
    ))}
  </>
);

const MixedExample = () => (
  <div>
    <SkyscannerRelativeExample />
    <LarkenExample />
  </div>
);

export {
  SkyscannerRelativeExample,
  LarkenExample,
  MixedExample,
};


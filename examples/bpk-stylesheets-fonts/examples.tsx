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

const FONT_TYPES = { LARKEN: 'larken', SKYSCANNER: 'skyscanner' } as const;
const FONT_STYLES = { NORMAL: 'normal', ITALIC: 'italic' } as const;

type FontType = (typeof FONT_TYPES)[keyof typeof FONT_TYPES];
type FontStyle = (typeof FONT_STYLES)[keyof typeof FONT_STYLES];

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
    lang: 'ja-JP',
  },
  korean: {
    text: '한국어는 대한민국의 공용어입니다. 안녕하세요 그리고 새해 복 많이 받으세요.',
  },
  simplifiedChinese: {
    text: '简体中文是中华人民共和国的官方语言。你好，然后新年快乐。',
    lang: 'zh-CN',
  },
  traditionalChinese: {
    text: '繁體中文是中華民國的官方語言。你好，然後新年快樂。',
    lang: 'zh-TW',
  },
};

const SKYSCANNER_RELATIVE_WEIGHTS = [
  { weight: 400, style: FONT_STYLES.NORMAL, label: '400' },
  { weight: 400, style: FONT_STYLES.ITALIC, label: '400 Italic' },
  { weight: 500, style: FONT_STYLES.NORMAL, label: '500' },
  { weight: 500, style: FONT_STYLES.ITALIC, label: '500 Italic' },
  { weight: 700, style: FONT_STYLES.NORMAL, label: '700' },
  { weight: 700, style: FONT_STYLES.ITALIC, label: '700 Italic' },
  { weight: 900, style: FONT_STYLES.NORMAL, label: '900' },
  { weight: 900, style: FONT_STYLES.ITALIC, label: '900 Italic' },
];

const LARKEN_WEIGHTS = [
  { weight: 300, style: FONT_STYLES.NORMAL, label: '300' },
  { weight: 400, style: FONT_STYLES.NORMAL, label: '400' },
];

interface FontTestRowProps {
  text: string;
  fontWeight: number;
  lang?: string;
  fontStyle: FontStyle;
  type: FontType;
}

const FontTestRow = ({
  fontStyle,
  fontWeight,
  lang,
  text,
  type,
}: FontTestRowProps) => (
  <div lang={lang}>
    <BpkText
      textStyle={
        type === FONT_TYPES.LARKEN
          ? TEXT_STYLES.editorial3
          : TEXT_STYLES.bodyDefault
      }
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
        {Object.entries(LANGUAGE_SAMPLES).map(([key, langSample]) => (
          <FontTestRow
            key={`skyscanner-${config.weight}-${config.style}-${key}`}
            text={langSample.text}
            fontWeight={config.weight}
            fontStyle={config.style}
            lang={(langSample as any).lang}
            type={FONT_TYPES.SKYSCANNER}
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
        {Object.entries(LANGUAGE_SAMPLES).map(([key, langSample]) => (
          <FontTestRow
            key={`larken-${config.weight}-${config.style}-${key}`}
            text={langSample.text}
            fontWeight={config.weight}
            fontStyle={config.style}
            lang={(langSample as any).lang}
            type={FONT_TYPES.LARKEN}
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

export { SkyscannerRelativeExample, LarkenExample, MixedExample };

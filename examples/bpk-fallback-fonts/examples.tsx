
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


type Script = 'latin' | 'greek' | 'cyrillic' | 'arabic';

const SAMPLES: Record<Script, string> = {
  latin: 'Skyscanner — Explore the world.',
  greek: 'Ξεφυλλίζοντας γράμματα: Αλφα, Βήτα, Γάμμα.',
  cyrillic: 'Сканер неба — путешествуй по миру.',
  arabic: 'سكاي سكانر — استكشف العالم.',
};

const STACKS = {
  // primary stack
  notoSans800: "'Noto Sans', 'Helvetica Neue', Arial, system-ui, sans-serif",
  notoSansArabic800: "'Noto Sans Arabic', Tahoma, 'Segoe UI', system-ui, sans-serif",

  // fallback stack (with a definitely-not-installed font at the start to force fallback)
  notoSans800Fallback: "'Definitely-Not-Installed', 'Helvetica Neue', Arial, system-ui, sans-serif",
  notoSansArabic800Fallback: "'Definitely-Not-Installed', Tahoma, 'Segoe UI', system-ui, sans-serif",
};

export interface BpkFallbackComponentProps {
  script?: Script;
  weight?: number;
  size?: number;
  forceFallback?: boolean;
}
export const SCRIPTS ={ ARABIC: 'arabic', LATIN: 'latin', GREEK: 'greek', CYRILLIC: 'cyrillic' } as const;

const BpkFallbackComponent = ({
  forceFallback = false,
  script = SCRIPTS.ARABIC,
  size = 22,
  weight = 800,
}: BpkFallbackComponentProps) => {
  const isArabic = script === 'arabic';
  let stack: string;
  if (isArabic) {
    stack = forceFallback ? STACKS.notoSansArabic800Fallback : STACKS.notoSansArabic800;
  } else {
    stack = forceFallback ? STACKS.notoSans800Fallback : STACKS.notoSans800;
  }

  return (
     <div style={{ padding: 16}}>
      <div
        style={{ fontFamily: stack, fontWeight: weight, fontSize: size }}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {SAMPLES[script]}
      </div>
      <div style={{ marginTop: 8 }}>
        <code>font-family: {stack}; font-weight: {weight};</code>
      </div>
    </div>
  );
};

export {
  BpkFallbackComponent
};

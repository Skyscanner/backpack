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

import type {
  GetLocalVariablesResponse,
  LocalVariableCollection,
  LocalVariable,
} from '@figma/rest-api-spec';

const FIGMA_API_BASE = 'https://api.figma.com/v1';

export type { GetLocalVariablesResponse, LocalVariableCollection, LocalVariable };

export class FigmaApiError extends Error {
  readonly status: number;

  readonly endpoint: string;

  readonly body: string;

  constructor(status: number, endpoint: string, body: string) {
    super(`Figma API ${status} (${endpoint}): ${body}`);
    this.name = 'FigmaApiError';
    this.status = status;
    this.endpoint = endpoint;
    this.body = body;
  }
}

export class FigmaApi {
  private readonly token: string;

  private readonly baseUrl: string;

  constructor(token: string, baseUrl: string = FIGMA_API_BASE) {
    if (!token || !token.trim()) {
      throw new Error('FigmaApi: token is required');
    }
    this.token = token;
    this.baseUrl = baseUrl;
  }

  async getLocalVariables(fileKey: string): Promise<GetLocalVariablesResponse> {
    if (!fileKey || !fileKey.trim()) {
      throw new Error('FigmaApi: fileKey is required');
    }
    // Figma file keys are alphanumeric in practice; encode anyway so a value
    // with stray whitespace or special characters can't break the URL.
    return this.request<GetLocalVariablesResponse>(
      `/files/${encodeURIComponent(fileKey)}/variables/local`,
    );
  }

  private async request<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        Accept: '*/*',
        'X-Figma-Token': this.token,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new FigmaApiError(response.status, endpoint, body);
    }

    return (await response.json()) as T;
  }
}

/**
 * @jest-environment node
 */
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

import { FigmaApi, FigmaApiError } from './figma-api';

describe('FigmaApi', () => {
  describe('constructor', () => {
    it('throws when token is empty or whitespace', () => {
      expect(() => new FigmaApi('')).toThrow('token is required');
      expect(() => new FigmaApi('   ')).toThrow('token is required');
    });
  });

  describe('getLocalVariables', () => {
    const fetchSpy = jest.spyOn(global, 'fetch');

    afterEach(() => {
      fetchSpy.mockReset();
    });

    it('rejects without calling fetch when fileKey is empty', async () => {
      const api = new FigmaApi('valid-token');
      await expect(api.getLocalVariables('')).rejects.toThrow(
        'fileKey is required',
      );
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('sends X-Figma-Token header and returns parsed JSON on 2xx', async () => {
      const payload = {
        status: 200,
        error: false,
        meta: { variables: {}, variableCollections: {} },
      };
      fetchSpy.mockResolvedValue(
        new Response(JSON.stringify(payload), { status: 200 }),
      );

      const api = new FigmaApi('secret-token');
      const result = await api.getLocalVariables('file-123');

      expect(result).toEqual(payload);
      expect(fetchSpy).toHaveBeenCalledWith(
        'https://api.figma.com/v1/files/file-123/variables/local',
        {
          headers: {
            Accept: '*/*',
            'X-Figma-Token': 'secret-token',
          },
        },
      );
    });

    it('URL-encodes the fileKey so stray special characters cannot break the URL', async () => {
      fetchSpy.mockResolvedValue(
        new Response(
          JSON.stringify({ status: 200, error: false, meta: { variables: {}, variableCollections: {} } }),
          { status: 200 },
        ),
      );
      const api = new FigmaApi('valid-token');
      await api.getLocalVariables('weird key/with?stuff');
      expect(fetchSpy).toHaveBeenCalledWith(
        'https://api.figma.com/v1/files/weird%20key%2Fwith%3Fstuff/variables/local',
        expect.any(Object),
      );
    });

    it('throws FigmaApiError carrying status, endpoint and body on non-2xx', async () => {
      fetchSpy.mockResolvedValue(new Response('forbidden', { status: 403 }));
      const api = new FigmaApi('bad-token');

      const error = await api.getLocalVariables('file-xyz').catch((e) => e);
      expect(error).toBeInstanceOf(FigmaApiError);
      expect(error).toMatchObject({
        name: 'FigmaApiError',
        status: 403,
        endpoint: '/files/file-xyz/variables/local',
        body: 'forbidden',
      });
    });
  });
});

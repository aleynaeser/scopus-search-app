'use server';

import { get } from '@common/lib/fetch-api';
import { IScopusSearchEntry } from '../interfaces';

const path = '';

export const searchInScopus = (params: TServiceSearchParams) => get<IScopusSearchEntry>('', { params, path });

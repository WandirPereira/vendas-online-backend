
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async getCache<T>(key: string, functionRequest: () => Promise<T>): Promise<T> {

        const alldataCached: T = await this.cacheManager.get(key);

        if (alldataCached) {
            return alldataCached;
        }

        const alldata: T = await functionRequest();

        await this.cacheManager.set(key, alldata);

        return alldata;
    }

}

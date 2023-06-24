
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
//import { Cache } from 'cache-manager';
//import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from '../cache/cache.service';



@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        //@Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly cacheService: CacheService,
    ) { }

    async getAllCities(): Promise<CityEntity[]> {
        return this.cityRepository.find();
    }

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {

        /*
        const citiesCache: CityEntity[] = await this.cacheManager.get(`state_${stateId}`);

        if (citiesCache) {
            return citiesCache;
        }

        const cities = await this.cityRepository.find({
            where: {
                stateId,  //equivale a stateId=stateId
            },
        });

        await this.cacheManager.set(`state_${stateId}`, cities)

        return cities;
        */
        return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () => this.cityRepository.find({
            where: {
                stateId,  //equivale a stateId=stateId
            },
        }),
        );
    }

}

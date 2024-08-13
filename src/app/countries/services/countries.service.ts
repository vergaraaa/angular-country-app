import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      query: '',
      countries: [],
    },
    byName: {
      query: '',
      countries: [],
    },
    byRegion: {
      region: undefined,
      countries: [],
    },
  };

  searchByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url).pipe(
      // map((countries) => (countries.length > 0 ? countries[0] : null)),
      map((countries) => countries[0]),
      catchError(() => of(null))
    );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchByCapital(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;

    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCapital = { query, countries }))
    );
  }

  searchByName(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;

    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byName = { query, countries }))
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries }))
    );
  }
}

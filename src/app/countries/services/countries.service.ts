import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  searchByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => countries[0]),
      catchError(() => of(null))
    );
  }

  searchByCapital(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;

    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchByName(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;

    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchByRegion(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${query}`;

    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }
}

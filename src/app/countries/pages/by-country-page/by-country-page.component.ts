import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];
  public initialQuery: string = '';

  ngOnInit(): void {
    this.initialQuery = this.countriesService.cacheStore.byName.query;
    this.countries = this.countriesService.cacheStore.byName.countries;
  }

  searchByName(query: string) {
    this.countriesService.searchByName(query).subscribe((countries) => {
      this.countries = countries;
    });
  }
}

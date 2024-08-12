import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];

  searchByName(query: string) {
    this.countriesService.searchByName(query).subscribe((countries) => {
      this.countries = countries;
    });
  }
}

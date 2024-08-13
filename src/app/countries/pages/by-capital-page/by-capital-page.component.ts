import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {
  constructor(private countriesService: CountriesService) {}

  public countries: Country[] = [];
  public isLoading: boolean = false;

  searchByCapital(query: string) {
    this.isLoading = true;

    this.countriesService.searchByCapital(query).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}

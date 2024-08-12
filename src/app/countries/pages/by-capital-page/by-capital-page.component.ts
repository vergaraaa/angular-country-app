import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {
  searchByCapital(search: string) {
    console.log('from by capital page');
    console.log({ search });
  }
}

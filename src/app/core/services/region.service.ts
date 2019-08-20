import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country, City } from '../../shared/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private readonly apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3000/region';
  }

  public getCountriesByInput(input: string) {
    return this.http.get<Country[]>(`${this.apiUrl}/country?input=${input}`);
  }

  public getCitiesByInputAndCountry(input: string, country: string) {
    return this.http.get<City[]>(
      `${this.apiUrl}/city?input=${input}&country=${country}`
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {
  debounceTime,
  switchMap,
  map,
  repeat,
  tap,
  filter
} from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { Item } from '../../shared/models/item.model';
import { RegionService } from '../../core/services/region.service';
import { Country, City } from '../../shared/models/country.model';
import { NewUser } from '../../shared/models/new-user.model';
import { AuthService } from '../../core/services/auth.service';
import { passwordPattern, matchPassword } from '../../shared/validators/password.validator';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';

interface Role {
  name: string;
  id: number;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public mainForm: FormGroup;
  public authForm: FormGroup;
  public roleForm: FormGroup;
  public roles: Role[];
  public countries$: Observable<Item[]>;
  public countrySelected: boolean;
  public cities$: Observable<Item[]>;
  public citySelected: boolean;
  public loading: boolean;
  public passwordHint: string;

  constructor(
    private region: RegionService,
    private auth: AuthService,
    private dialog: NbDialogService
  ) {
    this.roles = [{ name: 'Модель', id: 0 }, { name: 'Фотограф', id: 1 }];
    this.countrySelected = false;
    this.citySelected = false;
    this.loading = false;
    this.passwordHint = `Пароль должен состоять из как минимум
    одной большой и одной маленькой
    латинской буквы, одной цифры, минимальная длина 8 символов`;
  }

  ngOnInit() {
    this.initMainForm();
    this.initAuthForm();
    this.initRoleForm();
  }

  private initMainForm() {
    this.mainForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl({ value: '', disabled: true }, [
        Validators.required
      ])
    });
    this.countries$ = this.buildItemsObservable(
      this.mainForm.get('country').valueChanges,
      () => this.refreshContryState(),
      input => this.region.getCountriesByInput(input),
      countries => this.mapCountriesToItems(countries)
    );
    this.cities$ = this.buildItemsObservable(
      this.mainForm.get('city').valueChanges,
      () => this.refreshCityState(),
      input =>
        this.region.getCitiesByInputAndCountry(
          input,
          this.mainForm.get('country').value
        ),
      cities => this.mapCitiesToItems(cities)
    );
  }

  private initAuthForm() {
    this.authForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(passwordPattern)
        ]),
        confirmPassword: new FormControl('')
      },
      matchPassword
    );
    this.authForm.get('password').valueChanges.subscribe(() => {
      this.authForm
        .get('confirmPassword')
        .updateValueAndValidity({ emitEvent: true, onlySelf: true });
    });
  }

  private initRoleForm() {
    this.roleForm = new FormGroup({
      role: new FormControl(null, [Validators.required])
    });
  }

  public onCountrySelect(item: Item) {
    this.countrySelected = true;
    this.mainForm.patchValue({ country: item.name }, { emitEvent: false });
    this.mainForm.get('city').enable();
  }

  public onCitySelect(item: Item) {
    this.citySelected = true;
    this.mainForm.patchValue({ city: item.name }, { emitEvent: false });
  }

  public buildItemsObservable<T>(
    source: Observable<string>,
    beforeAction: (arg0: string) => void,
    switchAction: (arg0: string, arg1: number) => Observable<T>,
    mapAction: (arg0: T) => Item[]
  ): Observable<Item[]> {
    return source.pipe(
      tap(beforeAction),
      filter(input => !!input),
      debounceTime(1000),
      switchMap(switchAction),
      map(mapAction),
      repeat()
    );
  }

  private refreshContryState() {
    this.countrySelected = false;
    this.mainForm.patchValue({ city: '' }, { emitEvent: false });
    this.mainForm.get('city').disable();
  }

  private refreshCityState() {
    this.citySelected = false;
  }

  private mapCountriesToItems(countries: Country[]): Item[] {
    return countries.map(country => ({
      name: country.name,
      value: country.nativeName,
      pictureUrl: country.flag
    }));
  }

  private mapCitiesToItems(cities: City[]): Item[] {
    return cities.map(city => ({
      name: city.toponymName,
      value: city.name
    }));
  }

  private getNewUser(): NewUser {
    const mainInfo = this.mainForm.getRawValue();
    const authInfo = this.authForm.getRawValue();
    const roleInfo = this.authForm.getRawValue();
    return {
      city: mainInfo.city,
      country: mainInfo.country,
      name: mainInfo.name,
      lastname: mainInfo.surname,
      email: authInfo.email,
      password: authInfo.password,
      profileType: roleInfo.role
    };
  }

  public signUp(stepper: any) {
    const newUser = this.getNewUser();
    this.loading = true;
    this.auth.signUp(newUser).subscribe(async ({ userId }) => {
      stepper.next();
      await this.auth.sendConfirmation(userId).toPromise();
      const dialogRef = this.dialog.open(ConfirmEmailComponent, {
        context: { userId }
      });
    });
  }
}

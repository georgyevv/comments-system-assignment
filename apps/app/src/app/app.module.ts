import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// Material Imports
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

const materialImports = [
  MatSnackBarModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule
];

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { environment } from '../environments/environment';
import { TopNavigationLayoutComponent } from './core/components/top-navigation-layout/top-navigation-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { InMemoryDataService } from './core/services/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TopNavigationLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'Comments System',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    HttpClientModule,
    AppRoutingModule,
    ...materialImports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

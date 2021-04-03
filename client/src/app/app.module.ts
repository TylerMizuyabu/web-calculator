import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule } from 'ngx-socket-io';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStateService } from './core/app-state/app-state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalculationModule } from './calculation/calculation.module';
import { HomeComponent } from './pages/home/home.component';
import { environment } from '../environments/environment';
import { ServerClientService } from './core/server-client/server-client.service';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CalculationModule, SocketIoModule.forRoot(environment.wsServer), MatCardModule],
  providers: [AppStateService, ServerClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}

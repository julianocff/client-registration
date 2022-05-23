import { HomneComponent } from './homne/homne.component';
import { RegistrationComponent } from './registration/registration.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomneComponent },
  { path: 'list', component: ListComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

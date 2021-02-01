import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { PaymentBookingComponent } from './shared/components/payment-booking/payment-booking.component';
import { AuthGuard } from './core/auth/service/authguard.service';
import { MyBookingsComponent } from './home/components/my-bookings/my-bookings.component';
import { DeactivateGuardService } from './core/services/deactivate-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', loadChildren: './home/home.module#HomeModule'
  },
  { path: 'movie', loadChildren: './movie/movie.module#MovieModule' },
  { path: 'search', loadChildren: './search/search.module#SearchModule' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'bookings', component: MyBookingsComponent, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  {
    path: 'payment/:bookingDetails', component: PaymentBookingComponent,
    canActivate: [AuthGuard], canDeactivate: [DeactivateGuardService],
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

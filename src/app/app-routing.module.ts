import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeatsComponent } from './seats/seats.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { FailedComponent } from './failed/failed.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [{path:'',redirectTo:'/home', pathMatch:'full'},
{path:"home",component:HomeComponent},
{path:"seats",component:SeatsComponent},
{path:"seats/:seats",component:SeatsComponent},
{path:"payment/:id",component:PaymentComponent},
{path:"success/:id",component:SuccessComponent},
{path:"failed",component:FailedComponent},
{path: '**', component: PagenotfoundComponent, data: { seopath: true }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[HomeComponent,SeatsComponent,PagenotfoundComponent,PaymentComponent,SuccessComponent,FailedComponent];

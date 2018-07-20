/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AccountComponent } from './Account/Account.component';

import { SampleParticipantComponent } from './SampleParticipant/SampleParticipant.component';
import { BankComponent } from './Bank/Bank.component';
import { CustomerComponent } from './Customer/Customer.component';

import { CreateAccountComponent } from './CreateAccount/CreateAccount.component';
import { DeleteAccountComponent } from './DeleteAccount/DeleteAccount.component';
import { TransferFundsComponent } from './TransferFunds/TransferFunds.component';
import { GetBalanceComponent } from './GetBalance/GetBalance.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Account', component: AccountComponent },
  { path: 'SampleParticipant', component: SampleParticipantComponent },
  { path: 'Bank', component: BankComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'CreateAccount', component: CreateAccountComponent },
  { path: 'DeleteAccount', component: DeleteAccountComponent },
  { path: 'TransferFunds', component: TransferFundsComponent },
  { path: 'GetBalance', component: GetBalanceComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }

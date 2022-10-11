import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TabComponent } from './components/tab/tab.component';
import { CashbackComponent } from './components/tab/cashback.component';
import { StoreComponent } from './components/tab/store.component';
import { SportComponent } from './components/tab/sport.component';

const routes: Routes = [
  { path: 'store', component: StoreComponent },
  { path: 'cashback', component: CashbackComponent },
  { path: 'loyalty', component: TabComponent },
  { path: 'test', component: TabComponent },
  { path: 'sample', component: TabComponent },
  { path: 'survey', component: TabComponent },
  { path: 'sport', component: SportComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TabComponent } from './components/tab/tab.component';

const routes: Routes = [
  { path: 'store', component: TabComponent },
  { path: 'cashback', component: TabComponent },
  { path: 'loyalty', component: TabComponent },
  { path: 'test', component: TabComponent },
  { path: 'sample', component: TabComponent },
  { path: 'survey', component: TabComponent },
  { path: 'sport', component: TabComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

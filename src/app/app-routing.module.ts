import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProcessComponent } from './edit-process/edit-process.component';
import { NewProcessComponent } from './new-process/new-process.component';
import { ProcessComponent } from './process/process.component';


const routes: Routes = [  
  { path: 'process', component: ProcessComponent },
  { path: 'process/:id', component: EditProcessComponent },
  { path: 'newProcess', component: NewProcessComponent },
  { path: '', component: ProcessComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

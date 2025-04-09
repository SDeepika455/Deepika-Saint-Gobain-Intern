import { Routes} from '@angular/router';
import { HelloworldComponent } from './helloworld/helloworld.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentDataPageComponent } from './components/student-data-page/student-data-page.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


export const routeConfig: Routes = [
    {
        path:'',
        component: HelloworldComponent,
        title: 'Welcome Page'
    },

    {
        path:'studentform',
        component: StudentFormComponent,
        title:'studentform'
        
        
    },

    {
        path:'student-data',
        component:StudentDataPageComponent,
       
    },
];


export default routeConfig;

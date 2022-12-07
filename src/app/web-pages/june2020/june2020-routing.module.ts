import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {June2020Component} from "./june2020.component";
import {June2020ViewComponent} from "./june2020-view/june2020-view.component";


const routes: Routes = [
    {
        path: '',
        component: June2020Component,
        data: {
            title: 'June2020',
        },
    },
    {
        path: ':id',
        component: June2020ViewComponent,
        data: {
            title: 'June2020',
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class June2020RoutingModule {}


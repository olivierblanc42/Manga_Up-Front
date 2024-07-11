import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';

import { UsersComponent } from './pages/Admin/users/users.component';
import { UserComponent } from './pages/Admin/user/user.component';
import  {AdminLayoutComponent} from "./pages/Admin/admin-layout/admin-layout.component";
import { MangaComponent } from './pages/manga/manga.component';
import { MangasComponent } from './pages/mangas/mangas.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GeneralConditionComponent } from './pages/general-condition/general-condition.component';
import { GenresComponent } from './pages/genres/genres.component';


export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "about", component: AboutComponent},
    {path: "contact",component:ContactComponent},
    {path: "mention_legale",component:GeneralConditionComponent},
    {path: "mangas", component: MangasComponent},
    {path: "manga/:id", component: MangaComponent},
    { path: "genres", component: GenresComponent },
    {path: "admin",
        component:AdminLayoutComponent,
    children:[
        {path: "users", component: UsersComponent},
        {path: "users/:id", component: UserComponent},
    ]},
    {path: "error/:code", component: ErrorComponent},
    {path: "**", redirectTo: "error/404"}
]; 

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';
import { UsersComponent } from './pages/Admin/users/users.component';
import { UserComponent } from './pages/Admin/user/user.component';
import { AdminLayoutComponent } from './pages/Admin/admin-layout/admin-layout.component';
import { MangaComponent } from './pages/manga/manga.component';
import { MangasComponent } from './pages/mangas/mangas.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GeneralConditionComponent } from './pages/general-condition/general-condition.component';
import { GenresComponent } from './pages/genres/genres.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';
import {GenreComponent} from "./pages/genre/genre.component";
import {AuthorComponent} from "./pages/author/author.component";
import {AuthorsComponent} from "./pages/authors/authors.component";
import {CategoriesComponent} from "./pages/categories/categories.component";
import {CategoryComponent} from "./pages/category/category.component";

// ADMIN Component
import {CategoriesAdminComponent} from "./pages/Admin/categories/categoriesAdmin.component";
import {CategoryAdminComponent} from "./pages/Admin/category/categoryAdmin.component";
import {AuthorAdminComponent} from "./pages/Admin/author/author.component";
import {AuthorsAdminComponent} from "./pages/Admin/authors/authors.component";
import {MangasAdminComponent} from "./pages/Admin/mangas/mangas.component";
import {MangaAdminComponent} from "./pages/Admin/manga/manga.component";
import {GenresAdminComponent} from "./pages/Admin/genres/genres.component";
import {GenreAdminComponent} from "./pages/Admin/genre/genre.component";
import {GendersAdminComponent} from "./pages/Admin/genders/genders.component";
import {GenderAdminComponent} from "./pages/Admin/gender/gender.component";



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'authors', component: AuthorsComponent },
    { path: 'author/:id', component: AuthorComponent },
    { path: 'mention_legale', component: GeneralConditionComponent },
    { path: 'mangas', component: MangasComponent },
    { path: 'manga/:id', component: MangaComponent },
    { path: "genre/:id", component: GenreComponent },
    { path: 'genres', component: GenresComponent },
    { path: "category/:id", component: CategoryComponent },
    { path: "categories", component: CategoriesComponent },


    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: AdminLayoutComponent,
       canActivate: [AuthGuard],
        children: [
            {path: 'users', component: UsersComponent },
            {path: 'users/:id', component: UserComponent },
            {path: "categories", component: CategoriesAdminComponent},
            {path: "category/:id", component: CategoryAdminComponent},
            {path: "authors", component: AuthorsAdminComponent},
            {path: "author/:id", component: AuthorAdminComponent},
            {path: 'mangas', component: MangasAdminComponent },
            {path: 'manga/:id', component: MangaAdminComponent },
            {path: "genre/:id", component: GenreAdminComponent },
            {path: 'genres', component: GenresAdminComponent },
            {path: 'genders', component: GendersAdminComponent },
            {path: 'gender/:id', component: GenderAdminComponent },

        ]
    },
    { path: 'error/:code', component: ErrorComponent },
    { path: '**', redirectTo: 'error/404' }
];

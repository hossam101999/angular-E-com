// <AppendMode.routes>

import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { RegistrationComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './prodect-details/prodect-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductListComponent,
        title: 'Products'
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent
    },
    {
        path: 'register',
        component: RegistrationComponent,
        title: 'Register'
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Cart'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Not Found'
    }
];



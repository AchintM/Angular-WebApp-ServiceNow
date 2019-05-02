import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AdminHomeRoutes} from './admin-home/admin-home-routing';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {UserManagementHomeComponent} from './user-management/user-management-home/user-management-home.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {UserManagementRoutes} from './user-management/user-management.route';

@NgModule(
  {
    imports: [
      RouterModule.forChild( AdminHomeRoutes ),
      RouterModule.forChild( UserManagementRoutes )
    ],
    exports: [
      RouterModule
    ],
    declarations: [
      UserManagementComponent,
      AdminHomeComponent,
      UserManagementHomeComponent],

  } )

export class AdminRoutingModule
{
}
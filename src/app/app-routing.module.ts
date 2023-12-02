import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainComponent } from "./main/main.component";
import { SavedCitiesComponent } from "./saved-cities/saved-cities.component";
import { UserComponent } from "./user/user.component";

const routes:Routes=[
    {path:'', component:   MainComponent},
    {path:'main', component:   MainComponent},
    {path:'saved', component:SavedCitiesComponent},
    {path:'user', component: UserComponent}
    
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}
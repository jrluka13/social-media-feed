import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ERoutePath} from "../../../../shared/enums/route-path.enum";
import {FriendsComponent} from "./friends.component";

const routes: Routes = [
  {
    path: ERoutePath.ROOT,
    component: FriendsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsRoutingModule {

}

import {RouterModule,Routes} from '@angular/router';
import {
	TestappComponent,
	// FruitbannerboxComponent
	}from "./components/index.paginas";

	import { AuthGuard } from './guards/auth.guard';

const app_routes: Routes = [
	{path:'',component:TestappComponent},
	// {path:'fruitbannerbox',component:FruitbannerboxComponent},
	{path:'**',pathMatch:'full',redirectTo:''}
	];
	export const app_routing = RouterModule.forRoot(app_routes);


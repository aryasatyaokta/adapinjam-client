import { Routes } from "@angular/router";
import { FeatureBranchComponent } from "./feature-branch.component";
import { featureGuard } from "../../core/guard/feature.guard";

export const branchRoutes : Routes = [
    {
        path: 'cabang', component: FeatureBranchComponent, canActivate: [featureGuard('GET_ALL_BRANCH')]
    }
]



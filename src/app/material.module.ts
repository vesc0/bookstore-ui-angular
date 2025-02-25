import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button"
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule ({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatCardModule,
        MatSidenavModule,
        MatTabsModule,
        MatSelectModule,
        MatDialogModule,
        MatCheckboxModule,
        MatPaginatorModule,   
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatCardModule,
        MatSidenavModule,
        MatTabsModule,
        MatSelectModule,
        MatDialogModule,
        MatCheckboxModule,
        MatPaginatorModule,
    ]
})

export class MaterialModule{

}
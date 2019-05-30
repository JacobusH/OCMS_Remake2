import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule   
  , MatDialogModule, MatMenuModule 
  , MatFormFieldModule, MatSidenavModule
  , MatSelectModule, MatInputModule
  , MatIconModule, MatIconRegistry  
  , MatGridListModule, MatCardModule
  , MatExpansionModule
} from '@angular/material';

// components
import { LiveChatComponent } from './live-chat.component';
import { BubbleComponent } from './bubble/bubble.component';
import { LiveChatManagerComponent } from './manager/manager.component';
import { WindowComponent } from './window/window.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatSidenavModule,
  ],
  declarations: [
    LiveChatComponent,
    BubbleComponent,
    LiveChatManagerComponent,
    WindowComponent,
  ],
  exports: [
    LiveChatComponent,
    BubbleComponent,
    LiveChatManagerComponent,
    WindowComponent,
  ]
})
export class LiveChatModule { }

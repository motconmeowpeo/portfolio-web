import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from '@core/components';
import { HttpService } from '@core/services/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxEditorModule } from 'ngx-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const firebaseConfig = {
  apiKey: 'AIzaSyBLmyT1VQYsb-Wo8GV_dUp1evDd_cvXy7M',
  authDomain: 'portfolio-403709.firebaseapp.com',
  projectId: 'portfolio-403709',
  storageBucket: 'portfolio-403709.appspot.com',
  messagingSenderId: '778215680092',
  appId: '1:778215680092:web:9aa50668733282508bde99',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => '',
      },
    }),
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',

        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    })
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule { }

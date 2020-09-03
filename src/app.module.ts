import { Module } from '@nestjs/common';
import { DocumentModule } from './document/document.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { StudentModule } from './student/student.module';
import { AuthorityModule } from './authority/authority.module';
import { DocumentOneModule } from './document-one/document-one.module';
import { DocumentTwoModule } from './document-two/document-two.module';
import { DocumentThreeModule } from './document-three/document-three.module';
import { DocumentFourModule } from './document-four/document-four.module';
import { DocumentFiveModule } from './document-five/document-five.module';
import { DocumentNineModule } from './document-nine/document-nine.module';
import { DocumentElevenModule } from './document-eleven/document-eleven.module';
import { DocumentTwelveModule } from './document-twelve/document-twelve.module';
import { DocumentFourteenModule } from './document-fourteen/document-fourteen.module';
import { DocumentFifteenModule } from './document-fifteen/document-fifteen.module';
import { DocumentSixteenModule } from './document-sixteen/document-sixteen.module';
import { DocumentSevenModule } from './document-seven/document-seven.module';
import { DocumentSixModule } from './document-six/document-six.module';
import { DocumentEightModule } from './document-eight/document-eight.module';
import { DocumentTenModule } from './document-ten/document-ten.module';
import { DocumentThirteenModule } from './document-thirteen/document-thirteen.module';
import { DocumentSeventeenModule } from './document-seventeen/document-seventeen.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { SubjectModule } from './subject/subject.module';
import { UploadModule } from './upload/upload.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DocumentModule,
    StudentModule,
    AuthorityModule,
    DocumentOneModule,
    DocumentTwoModule,
    DocumentThreeModule,
    DocumentFourModule,
    DocumentFiveModule,
    DocumentNineModule,
    DocumentElevenModule,
    DocumentTwelveModule,
    DocumentFourteenModule,
    DocumentFifteenModule,
    DocumentSixteenModule,
    DocumentSevenModule,
    DocumentSixModule,
    DocumentEightModule,
    DocumentTenModule,
    DocumentThirteenModule,
    DocumentSeventeenModule,
    AuthModule,
    AdminModule,
    SubjectModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

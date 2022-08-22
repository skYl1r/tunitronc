import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {TestService} from './test.service';
import {AlertService} from '../../service/alert.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
declare var $: any;
import {CategoryService} from '../../service/category.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnonceService} from '../../service/annonce.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit  {
  selectedFiles: FileList;
  currentFileUpload: File;
  filestring ;
  converted_image;
  private categories;
  private subCatgories;
  private text;

  constructor(private uploadService: TestService,
              private alertService: AlertService,
              private router: Router,
              private catService: CategoryService,
              private formBuilder: FormBuilder,
              private annonceService: AnnonceService,

  ) {
  }



  ngOnInit() {


  }



  showModal(): void {
    $('#myModal').modal('show');
  }
  sendModal(): void {
    // do something here
    console.log(this.text);
    this.hideModal();
  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }



}

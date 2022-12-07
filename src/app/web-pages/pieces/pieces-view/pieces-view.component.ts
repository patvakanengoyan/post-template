import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {RequestService} from "../../../shared/service/request.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-pieces-view',
  templateUrl: './pieces-view.component.html',
  styleUrls: ['./pieces-view.component.scss']
})
export class PiecesViewComponent implements OnInit {

    public url: string = environment.webPages.pieces.get;
    public data: any | object = {};
    public form = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.compose([Validators.required])],
        message: ['', Validators.required]
    });
    public imagePrefix: string = environment.imagePrefix;
    constructor(private requestService: RequestService,
                public activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer,
                public fb: FormBuilder) {}

    ngOnInit(): void {
        this.getData(`${this.url}?facet=on&q=*%3A*&start=0&rows=1&fq=type:Pieces&fq=id:${this.activatedRoute.snapshot.params['id']}`);
    }
    getData (url: string) {
        this.requestService.getData(url).subscribe((item: any) => {
            this.data = item?.response?.docs[0];
            this.data.content = this.sanitizer.bypassSecurityTrustHtml(this.data.content);
        })
    }

    sendComment() {

    }

}

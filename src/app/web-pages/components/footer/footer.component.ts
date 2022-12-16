import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {RequestService} from "../../../shared/service/request.service";
import {environment} from "../../../../environments/environment.prod";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() redirection: boolean | undefined;
  public url: string = environment.posts.get;
  public data: any[] = [];
  public imagePrefix: string = environment.imagePrefix;

  constructor(private requestService: RequestService,
              private element: ElementRef,
              public router: Router,
              private renderer: Renderer2,) {
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    let header = this.element.nativeElement.querySelector('.scroll-top');
    if (header) {
      if (window.scrollY > 100) {
        this.renderer.addClass(header, 'active');
      } else {
        this.renderer.removeClass(header, 'active');
      }
    }
  }

  ngOnInit(): void {
    this.getData(`${this.url}?facet=on&q=*:*&start=0&rows=4`)
  }

  getData(url: string) {
    this.requestService.getData(url).subscribe((item: any) => {
      this.setUrls(item?.response?.docs);
    })
  }

  setUrls(value) {
    this.data = value.map((item) => {
      if (item.type === 'KidsClick') {
        item.url = '/posts/kids';
        return item;
      }
      if (item.type === 'AcademicSearch') {
        item.url = '/posts/academic';
        return item;
      }
      if (item.type === 'Pieces') {
        item.url = '/posts/pieces';
        return item;
      }
      if (item.type === 'June2020') {
        item.url = '/posts/june2020';
        return item;
      }
    })
  }

  goTop() {
    window.scroll(0,0)
  }
  redirectUrl () {
    if (this.redirection) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
    }
  }

}

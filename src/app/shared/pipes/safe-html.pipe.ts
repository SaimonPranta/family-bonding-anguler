import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Pipe({
  name: 'safeHtmlCustom'
})
export class SafeHtmlCustomPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {
  }

  public transform(value: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  // public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
  //   switch (type) {
  //     case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
  //     case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
  //     case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
  //     case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
  //     case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  //     default: throw new Error(`Invalid safe type specified: ${type}`);
  //   }
  // }

}

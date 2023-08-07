import { Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class ImgSanitizerService {
    constructor(private sanitizer: DomSanitizer) {}

    public sanitizeImg(data: string): SafeUrl {
        let objectURL = 'data:image/png;base64,' + data;
        return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
}
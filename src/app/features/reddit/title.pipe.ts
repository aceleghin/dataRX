import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';

@Pipe({
  name: 'titleVideo'
})
export class TitlePipe implements PipeTransform {

  constructor(private http: HttpClient) {
  }

  transform(url: string, title?: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Disposition', `attachment; filename=${title}.mp4`);

    return this.http
      .get(url, {headers: headers, responseType: 'blob'}).pipe(
        //  map((response: Blob) => ), // take the blob
        switchMap((blob: Blob) => {
          // return new observable which emits a base64 string when blob is converted to base64
          return Observable.create((observer: any) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob); // convert blob to base64
            reader.onloadend = function () {
              observer.next(reader.result);
            };
          });
        })
      );
  }

}

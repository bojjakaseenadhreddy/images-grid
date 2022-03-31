import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, Subject, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Image } from "../interfaces/image.interface";

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  selectedImage = new Subject<{ index: number, image?: Image }>();
  increaseLike = new Subject<number>();

  constructor(private _http: HttpClient) {
  }

  public getAllImages(): Observable<Image[]> {
    return this._http.get(environment.apiUrl).pipe(
      map((response: any) => response),
      catchError((e: any) => {
        return throwError(() => e);
      })
    );
  }

  public setSelectedImage(data: { index: number, image?: Image }) {
    this.selectedImage.next(data);
  }

  public getSelectedImage(): Observable<{ index: number, image?: Image }> {
    return this.selectedImage.asObservable();
  }

  public setIncreaseLikes(index: number) {
    this.increaseLike.next(index);
  }

  public getIncreaseLike(): Observable<number> {
    return this.increaseLike.asObservable();
  }

}

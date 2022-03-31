import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image } from 'src/app/interfaces/image.interface';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit, OnDestroy {

  images!: Image[];
  selectedImageIndex!: number;
  increaseLikeSubscription!: Subscription;
  ascendingOrder: boolean = true;

  constructor(private _imageService: ImageService) { }

  ngOnInit(): void {
    this.getImages();
    this.getIncreaseLike();
  }

  /**
   * fetches the images from API
   * @return void
   */
  private getImages(): void {
    this._imageService.getAllImages().subscribe({
      next: (res: Image[]) => {
        this.images = res;
      },
      error: (e) => {
        console.log(e.message || e);
      }
    });
  }

  public sortByLikes(isAscending: boolean): void {
    this.selectedImageIndex = -1;
    this._imageService.setSelectedImage({index: -1, image: undefined });

    this.ascendingOrder = !this.ascendingOrder;
    if (this.images) {
      this.images.sort((i1, i2) => {
        if (isAscending) {
          return i1.likes - i2.likes;
        } else {
          return i2.likes - i1.likes;
        }
      });
    }
  }

  public selectImage(index: number, image: Image) {
    this.selectedImageIndex = index;
    this._imageService.setSelectedImage({ index, image });
  }

  private getIncreaseLike(): void {
    this.increaseLikeSubscription = this._imageService.getIncreaseLike().subscribe((index: number) => {
      this.images[index].likes += 1;
    });
  }


  ngOnDestroy(): void {
    if (this.increaseLikeSubscription) {
      this.increaseLikeSubscription.unsubscribe();
    }
  }

}

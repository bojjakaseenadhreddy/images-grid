import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image } from 'src/app/interfaces/image.interface';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit, OnDestroy {

  image!: Image | undefined;
  selectedImageSubscription!: Subscription;
  index!: number;

  constructor(
    private _imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getSelectedImage();
  }

  private getSelectedImage(): void {
    this.selectedImageSubscription = this._imageService.getSelectedImage().subscribe((data) => {
      this.image = data.image;
      this.index = data.index;
    });
  }

  public increaseLike(): void {
    this._imageService.setIncreaseLikes(this.index);
  }

  ngOnDestroy(): void {
    if (this.selectedImageSubscription) {
      this.selectedImageSubscription.unsubscribe();
    }
  }

}

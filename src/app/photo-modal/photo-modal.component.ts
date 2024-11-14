import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent {
  selectedPhoto: Photo = {} as Photo;


  constructor(
    public dialogRef: MatDialogRef<PhotoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { photos: Photo[], idxSelectedPhoto: number }
  ) {
    this.selectedPhoto = this.data.photos[this.data.idxSelectedPhoto];
  }

  @ViewChild('photo') photoElement!: ElementRef;

  ngAfterViewInit(): void {
    this.setPhotoOrientationClass();
  }

  setPhotoOrientationClass(): void {
    const img = this.photoElement.nativeElement;
    img.onload = () => {
      if (img.naturalWidth > img.naturalHeight) {
        img.classList.add('landscape');
      } else {
        img.classList.add('portrait');
      }
    };
  }

  closeModal(): void {
    this.dialogRef?.close();
  }

  previousPhoto(): void {
    if (this.data.idxSelectedPhoto > 0) {
      this.data.idxSelectedPhoto--;
      this.selectedPhoto = this.data.photos[this.data.idxSelectedPhoto];
    }
  }

  nextPhoto(): void {
    if (this.data.idxSelectedPhoto < this.data.photos.length - 1) {
      this.data.idxSelectedPhoto++;
      this.selectedPhoto = this.data.photos[this.data.idxSelectedPhoto];
    }
  }

  isFirstPhoto(): boolean {
    return this.data.idxSelectedPhoto === 0;
  }

  isLastPhoto(): boolean {
    return this.data.idxSelectedPhoto === this.data.photos.length - 1;
  }
}

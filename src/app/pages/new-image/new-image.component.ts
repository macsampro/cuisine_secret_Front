import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from 'src/app/services/photos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit{
  recipeId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoServices: PhotosService,
    private router: Router

  ){}
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.recipeId = params['recipeId'];
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File): void {
    const formData = new FormData();
    formData.append('monFichier', file);
    formData.append('recipeId', this.recipeId.toString());

    this.photoServices.postImage(formData).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erreur lors de lupload de limage :', error);
      }
    });
  }}

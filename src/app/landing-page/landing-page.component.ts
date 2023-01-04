import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sharp } from 'sharp';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  height!: number;
  width!: number;
  imageUrl!: string;
  selectedImage!: string;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }
//method form submission
  onSubmit(): void{
    //send height and width to server and display resized image 
    this.http.get<Buffer>('/image', {
      params: {
        filename: this.selectedImage,
        width: this.width.toString(),
        height: this.height.toString()
      }
    }).subscribe((res) => {
      this.imageUrl = URL.createObjectURL(new Blob([res], {
        type:
          'image/jpeg'
      }));
    });
  }
}

import { Component, OnInit, ViewEncapsulation, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { apparateTrigger } from 'app/animations/apparate.animation';
import { GalleryItem } from 'app/models/galleryItem.model';
import { GalleryService } from 'app/services/gallery.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
  animations: [
    apparateTrigger
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class ImageGalleryComponent implements OnInit, OnChanges {
  @Input() filterBy?: string = 'all';
  @Input() filter:string = 'all'; // 'all, bootcamp, recital, 2018'
  @Input() pageSize: number = 4;
  @Output() itemSelected: EventEmitter<GalleryItem> = new EventEmitter;
  title = "Recent Photos";
  state: string = 'in';
  visibleImages;
  loadedImages = [];
  doneLoading: boolean = false;
  loadingPercent: number = 0;
  loadingCount: number = 0;
  loadingTotal: number = 30; // total imgs stored in 'all'
  isShown: boolean = false;
  filterOptions: Array<string> = [];

  loadedImagesTest;
  currentPage: number = 0;

  constructor(private galleryService: GalleryService) { 
    // this.visibleImages = this.galleryService.gallery;
    // this.visibleImages = this.galleryService.galleryActive;
  }

  ngOnInit() {
    // var cnt = this.db.object('/galleryUploadCount/' , { preserveSnapshot: true }).take(1);
    // cnt.subscribe(x => {
    //   this.loadingTotal = x.val().count;
    // });
    this.loadedImagesTest = this.galleryService.galleryActive.valueChanges()
        filter(
            x => {
                console.log(x);
                return true;
            }
        )

    this.loadedImagesTest.subscribe(x => {
      for(var i = 0; i < x.length; i++) {
        let splits = x[i].categories.split(',');
        for(var j = 0; j < splits.length; j++) {
          var element = splits[j].replace(/\s/g, '');
          if(this.filterOptions.indexOf(element) === -1) {
            this.filterOptions.push(element);
          }
        }
        x[i].loaded = false;
      }
    })

    this.filterBy = this.filter;

    // this.galleryService.gallery.valueChanges().subscribe(imgArr => {
    //   // this.loadedImages.push(img);
    //   this.loadedImages = imgArr;

    //   for(var i = 0; i < imgArr.length; i++) {
    //     for(var j = 0; j < imgArr[i].categories.length; j++) {
    //       if(this.filterOptions.indexOf(imgArr[i].categories[j]) === -1) {
    //         this.filterOptions.push(imgArr[i].categories[j]);
    //       }
    //     }
    //   }
      
      // for(var i = 0; i < img.length; i++) {
      //   let splits = img[i].categories.split(',');
      //   for(var j = 0; j < splits.length; j++) {
      //     var element = splits[j].replace(/\s/g, '');
      //     if(this.filterOptions.indexOf(element) === -1) {
      //       this.filterOptions.push(element);
      //     }
      //   }
      // }
    // });

  }

  ngOnChanges() {
    this.visibleImages = this.galleryService.gallery;    
  }

  unload(img) {
      img.loaded = false;
  }

  filterClicked(filterApplied: string) {
    this.currentPage = 0;
    this.filterBy = filterApplied; 
 }

 setSelectedItem(item: GalleryItem) {
    this.itemSelected.emit(item);
 }

 public isLoaded(event: Event) {
   this.loadingCount += 1;

   this.loadingPercent = (this.loadingCount / this.loadingTotal) * 100;
   if(this.loadingPercent == 100) {
     this.doneLoading = true;
   }
   // console.log("loading img" + this.loadingPercent);
   // console.log(event);
 }

}

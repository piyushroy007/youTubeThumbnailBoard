import { Component, HostListener } from '@angular/core';

interface Thumbnail {
  id: string;
  url: string;
  title: string;
  channelName: string;
  views: number;
  uploadedAt: string;
}

@Component({
  selector: 'app-thumbnail-board',
  templateUrl: './thumbnail-board.component.html',
  styleUrls: ['./thumbnail-board.component.scss'],
})
export class ThumbnailBoardComponent {
  videoUrl: string = '';
  thumbnails: Thumbnail[] = [];
  isLoading: boolean = false;

  constructor() {
    this.loadMoreThumbnails();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !this.isLoading
    ) {
      this.loadMoreThumbnails();
    }
  }

  extractVideoId(url: string): string {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }

  addThumbnail() {
    if (this.videoUrl) {
      const videoId = this.extractVideoId(this.videoUrl);
      if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

        const newThumbnail: Thumbnail = {
          id: videoId,
          url: thumbnailUrl,
          title: `Video Title ${this.thumbnails.length + 1}`,
          channelName: `Channel ${this.thumbnails.length + 1}`,
          views: Math.floor(Math.random() * 1000000),
          uploadedAt: '2 days ago',
        };
        this.thumbnails.unshift(newThumbnail);
        this.videoUrl = '';
      } else {
        alert('Invalid YouTube URL');
      }
    }
  }

  loadMoreThumbnails() {
    this.isLoading = true;
    // Simulate loading delay
    setTimeout(() => {
      for (let i = 0; i < 12; i++) {
        const newThumbnail: Thumbnail = {
          id: `mock-${this.thumbnails.length + 1}`,
          url: `https://picsum.photos/seed/${
            this.thumbnails.length + 1
          }/300/200`,
          title: `Mock Video Title ${this.thumbnails.length + 1}`,
          channelName: `Channel ${this.thumbnails.length + 1}`,
          views: Math.floor(Math.random() * 1000000),
          uploadedAt: '2 days ago',
        };
        this.thumbnails.push(newThumbnail);
      }
      this.isLoading = false;
    }, 1000);
  }
}

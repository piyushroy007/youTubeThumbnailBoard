import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService, Board, Thumbnail } from '../../services/board.service';
import { Subscription } from 'rxjs';
import { YoutubeApiService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-thumbnail-board',
  templateUrl: './thumbnail-board.component.html',
  styleUrls: ['./thumbnail-board.component.scss'],
})
export class ThumbnailBoardComponent implements OnInit, OnDestroy {
  videoUrl: string = '';
  currentBoard: Board | null = null;
  thumbnails: Thumbnail[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  private boardSubscription: Subscription | null = null;

  constructor(
    private boardService: BoardService,
    private youtubeApiService: YoutubeApiService,
    private route: ActivatedRoute
  ) {
    this.loadMoreThumbnails();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const boardId = params['id'] || 'default';
      this.boardService.setCurrentBoard(boardId);
    });

    this.boardSubscription = this.boardService
      .getCurrentBoard()
      .subscribe((board) => {
        this.currentBoard = board;
      });
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
  ngOnDestroy() {
    if (this.boardSubscription) {
      this.boardSubscription.unsubscribe();
    }
  }

  extractVideoId(url: string): string {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }

  addThumbnail() {
    if (this.videoUrl && this.currentBoard) {
      const videoId = this.extractVideoId(this.videoUrl);
      if (videoId) {
        this.isLoading = true;
        this.error = null;
        this.youtubeApiService.getVideoMetadata(videoId).subscribe(
          (metadata) => {
            // this.boardService.addThumbnail(metadata);
            console.log(metadata);
            const newThumbnail: Thumbnail = {
              id: videoId,
              url: metadata.thumbnailUrl,
              title: metadata.title,
              channelName: metadata.channelTitle,
              views: metadata.viewCount,
              uploadedAt: metadata.publishedAt,
            };
            this.thumbnails.unshift(newThumbnail);
            this.videoUrl = '';
            this.boardService.addThumbnailToBoard(
              this.currentBoard!.id,
              newThumbnail
            );
            // this.loadThumbnails();
            this.videoUrl = '';
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching video metadata:', error);
            this.error = 'Failed to fetch video metadata. Please try again.';
            this.isLoading = false;
          }
        );
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
          views: '1M',
          uploadedAt: '2 days ago',
        };
        this.thumbnails.push(newThumbnail);
      }
      this.isLoading = false;
    }, 1000);
  }
}

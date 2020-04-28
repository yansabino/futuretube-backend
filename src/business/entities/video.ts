export class Video {
  constructor(
    private videoId: string,
    private url: string,
    private description: string,
    private title: string,
    private userId: string
  ) {}

  public getVideoId(): string {
    return this.videoId;
  }
  public getUrl(): string {
    return this.url;
  }
  public getDescription(): string {
    return this.description;
  }
  public getTitle(): string {
    return this.title;
  }
  public getUserId(): string {
    return this.userId;
  }
}

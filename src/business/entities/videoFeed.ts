import { Video } from "./video";

export class VideoFeed extends Video {
  constructor(
    videoId: string,
    url: string,
    description: string,
    title: string,
    userId: string,
    private name: string,
    private picture: string
  ) {
    super(videoId, url, description, title, userId);
  }

  getName() {
    return this.name;
  }

  getPicture() {
    return this.picture;
  }
}

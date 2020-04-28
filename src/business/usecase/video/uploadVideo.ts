import { VideoGateway } from "../../gateways/videoGateway";
import { Video } from "../../entities/video";
import { v4 } from "uuid";

export class UploadVideoUC {
  constructor(private db: VideoGateway) {}

  public async execute(input: UploadVideoUCInput): Promise<void> {
    const videoId = this.generateVideoId();
    if (!input.url) {
      throw new Error("Input url is missing!");
    }
    if (!input.description) {
      throw new Error("Input description is missing!");
    }
    if (!input.title) {
      throw new Error("Input title is missing!");
    }

    const video = new Video(
      videoId,
      input.url,
      input.description,
      input.title,
      input.userId
    );
    await this.db.uploadVideo(video);
  }

  private generateVideoId() {
    return v4();
  }
}

export interface UploadVideoUCInput {
  url: string;
  description: string;
  title: string;
  userId: string;
}

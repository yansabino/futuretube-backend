import { VideoGateway } from "../../gateways/videoGateway";

export class GetAllVideosUC {
  constructor(private videoGateway: VideoGateway) {}

  private VIDEOS_PER_PAGE = 12;

  public async execute(
    input: GetAllVideosUCInput
  ): Promise<GetAllVideosUCOutPut[]> {
    let page = input.page >= 1 ? input.page : 1;
    const offset = this.VIDEOS_PER_PAGE * (page - 1);

    const videos = await this.videoGateway.getAllVideos(
      this.VIDEOS_PER_PAGE,
      offset
    );

    return videos.map((video) => {
      return {
        videoId: video.getVideoId(),
        title: video.getTitle(),
        url: video.getUrl(),
        picture: video.getPicture(),
        description: video.getDescription()
      };
    });
  }
}

export interface GetAllVideosUCInput {
  page: number;
}

export interface GetAllVideosUCOutPut {
  videoId: string;
  title: string;
  url: string;
  picture: string;
  description: string;
}

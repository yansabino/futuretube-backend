import { VideoGateway } from "../../gateways/videoGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { VideoFeed } from "../../entities/videoFeed";

export class GetUserVideosUC {
  constructor(
    private videoGateway: VideoGateway,
    private authenticationGateway: AuthenticationGateway
  ) {}

  public async execute(
    input: GetUserVideosUCInput
  ): Promise<GetUserVideosUCOutPut> {
    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(
      input.token
    );

    let videos: VideoFeed[] | undefined;

    if (!userInfo) {
      throw new Error("User Not Found");
    }

    if (input.userId) {
      videos = await this.videoGateway.getUserVideos(input.userId);
    } else if (!input.userId) {
      videos = await this.videoGateway.getUserVideos(userInfo.id);
    }

    if (!videos) {
      throw new Error("Feed is empty");
    }

    return {
      videos: videos.map((video) => {
        return {
          videoId: video.getVideoId(),
          url: video.getUrl(),
          description: video.getDescription(),
          title: video.getTitle(),
          userId: video.getUserId(),
        };
      }),
    };
  }
}

export interface GetUserVideosUCInput {
  userId: string;
  token: string;
}

export interface GetUserVideosUCOutPut {
  videos: GetUserVideosUCOutPutVideo[];
}

export interface GetUserVideosUCOutPutVideo {
  videoId: string;
  url: string;
  description: string;
  title: string;
  userId: string;
}

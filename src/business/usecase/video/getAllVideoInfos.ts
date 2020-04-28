import { VideoGateway } from "../../gateways/videoGateway";

export class GetAllVideoInfosUC {
  constructor(private videoGateway: VideoGateway) {}

  public async execute(
    input: GetAllVideoInfosUCInput
  ): Promise<GetAllVideoInfosUCOutput> {
    const video = await this.videoGateway.getAllVideoInfos(input.videoId);

    if (!video) {
      throw new Error("Video not found");
    }

    return {
      url: video.getUrl(),
      description: video.getDescription(),
      title: video.getTitle(),
      name: video.getName(),
      picture: video.getPicture(),
    };
  }
}

export interface GetAllVideoInfosUCInput {
  videoId: string;
}

//verificar porque não está pegando o nome e a picture

export interface GetAllVideoInfosUCOutput {
  url: string;
  description: string;
  title: string;
  name: string;
  picture: string;
}

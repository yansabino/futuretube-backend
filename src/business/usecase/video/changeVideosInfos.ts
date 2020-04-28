import { VideoGateway } from "../../gateways/videoGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class ChangeVideosInfosUC {
  constructor(
      private db: VideoGateway,
      private authenticationGateway: AuthenticationGateway
) {}

  public async execute(input: ChangeVideosInfosUCInput): Promise<void> {

    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(
        input.token
    );

    if (!userInfo) {
        throw new Error("User Not Found");
    }

    if (!input.newDescription || !input.newTitle) {
        throw new Error("You must fill in at least one field");
    }
   
    const video = await this.db.getVideoById(input.videoId);

    if (!video) {
      throw new Error("Video not found");
    }

    await this.db.changeVideosInfos(
      video.getVideoId(),
      input.newDescription,
      input.newTitle
    );
  }
}

export interface ChangeVideosInfosUCInput {
  token: string  
  videoId: string;
  newDescription: string;
  newTitle: string;
}

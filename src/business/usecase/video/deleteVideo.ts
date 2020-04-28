import { VideoGateway } from "../../gateways/videoGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class DeleteVideoUC{
    constructor(
        private videoGateway: VideoGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    async execute(input: DeleteVideoUCInput): Promise<void>{

        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(
            input.token
        );

        if (!userInfo) {
            throw new Error("User Not Found");
        }

        await this.videoGateway.deleteVideo(input.videoId)
    }
}

export interface DeleteVideoUCInput{
    videoId: string;
    token: string;
}
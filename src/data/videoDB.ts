import { BaseDB } from "./baseDB";
import { VideoGateway } from "../business/gateways/videoGateway";
import { Video } from "../business/entities/video";
import { VideoFeed } from "../business/entities/videoFeed";

export class VideoDB extends BaseDB implements VideoGateway {
  private videoTableName = "videos_futuretube";
  private usersTable = "users_futuretube";

  public async uploadVideo(video: Video): Promise<void> {
    await this.connection.raw(`
            INSERT INTO ${
              this.videoTableName
            } (videoId, url, description, title, userId)
            VALUES(
                '${video.getVideoId()}',
                '${video.getUrl()}',
                '${video.getDescription()}',
                '${video.getTitle()}',
                '${video.getUserId()}'
            )
        `);
  }

  public async getUserVideos(userId: string): Promise<VideoFeed[] | undefined> {
    const response = await this.connection.raw(`
            SELECT ${this.videoTableName}.*, ${this.usersTable}.*
            FROM ${this.videoTableName}
            JOIN ${this.usersTable}
            ON ${this.videoTableName}.userId = ${this.usersTable}.id
            WHERE ${this.videoTableName}.userId = "${userId}";
        `);

    if (!response[0]) {
      return undefined;
    }

    return response[0].map((video: any) => {
      return new VideoFeed(
        video.videoId,
        video.url,
        video.description,
        video.title,
        video.userId,
        video.name,
        video.picture
      );
    });
  }

  public async getVideoById(videoId: string): Promise<Video | undefined>{
    const result = await this.connection.raw(`
      SELECT * FROM ${this.videoTableName}
      WHERE videoId = '${videoId}'
    `)

    if (!result[0][0]) {
      return undefined;
    }

    return new Video(
      result[0][0].videoId,
      result[0][0].url,
      result[0][0].description,
      result[0][0].title,
      result[0][0].userId
    )
  }

  public async changeVideosInfos(videoId: string ,newDescription: string, newTitle: string): Promise<void>{
    await this.connection.raw(`
      UPDATE ${this.videoTableName}
      SET description = '${newDescription}', title = '${newTitle}'
      WHERE videoId = '${videoId}';
    `)
  }

  public async deleteVideo(videoId: string): Promise<void>{
    await this.connection.raw(`
      DELETE FROM ${this.videoTableName}
      WHERE videoId = '${videoId}'
    `)
  }

  public async getAllVideos(limit: number, offset: number): Promise<VideoFeed[]>{
    const response = await this.connection.raw(`
      SELECT ${this.videoTableName}.*, ${this.usersTable}.*
      FROM ${this.videoTableName}
      JOIN ${this.usersTable}
      ON ${this.videoTableName}.userId = ${this.usersTable}.id
      LIMIT ${limit} OFFSET ${offset};
    `)

    return response[0].map((video: any) => {
      return new VideoFeed(
        video.videoId,
        video.url,
        video.description,
        video.title,
        video.userId,
        video.name,
        video.picture
      );
    });
  }

  public async getAllVideoInfos(videoId: string): Promise<VideoFeed>{
    const result = await this.connection.raw(`
    SELECT ${this.videoTableName}.*, ${this.usersTable}.name as userName, ${this.usersTable}.picture as userPicture
    FROM ${this.videoTableName}
    JOIN ${this.usersTable}
    ON ${this.videoTableName}.userId = ${this.usersTable}.id
    WHERE videoId = '${videoId}
    `)

    return new VideoFeed(
      result[0][0].videoId,
      result[0][0].url,
      result[0][0].description,
      result[0][0].title,
      result[0][0].userId,
      result[0][0].name,
      result[0][0].picture
    )
  }
}

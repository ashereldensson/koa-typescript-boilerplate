import { BaseContext } from "koa";
import { description, request, summary, tagsAll } from "koa-swagger-decorator";

@tagsAll(["Status"])
export default class StatusController {

  @request("get", "/")
  @summary("Status")
  @description("The main page returning the status of the app and acts as health check endpoint.")
  public static async appStatus(ctx: BaseContext): Promise<void> {
    ctx.body = "Status";
  }

}

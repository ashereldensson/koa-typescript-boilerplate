import { BaseContext } from "koa";
import { description, request, responsesAll, summary, tagsAll } from "koa-swagger-decorator";

@tagsAll(["Auth"])
@responsesAll({ 200: { description: "Successful" }, 401: { description: "Unauthorized" } })
export default class AuthController {

  @request("get", "/auth")
  @summary("Protected Endpoint")
  @description("This endpoint requires users to be authenticated to be able to view it.")
  public static async protectedEndpoint(ctx: BaseContext): Promise<void> {
    ctx.body = "Protected endpoint";
  }

}

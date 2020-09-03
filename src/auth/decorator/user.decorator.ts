import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const GetUser = createParamDecorator(
  (data: unknown, request: Request) => {
    // console.log(ctx);
    // const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

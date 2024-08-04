import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RawHeaders = createParamDecorator(
    (data, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        console.log({ rawHeaders: req.rawHeaders })
        return req.rawHeaders;

    }
) 
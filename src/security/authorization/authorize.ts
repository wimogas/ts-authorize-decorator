import {UnauthorizedError} from "../../errors/UnauthorizedError";

export function authorize(permissions: string, policies?: string, roles?: string) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const classMethod = descriptor.value;

        descriptor.value = (...args: any[]) => {

            const request = args.find(arg => arg.body)

            const userPermissions = request.body.permissions
            const isAuthorized = userPermissions.includes(permissions)

            if (!isAuthorized) {
                throw new UnauthorizedError()
            }

            return classMethod.apply(this, args);
        };
    }
}
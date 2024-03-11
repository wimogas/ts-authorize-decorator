import {CreateUserController} from "../src/controllers/CreateUserController";

describe("Authorize Method Decorator", () => {

    let request: { body: { permissions: string; }; };
    let createUserController: CreateUserController

    beforeEach(() => {
        createUserController = new CreateUserController()
        request = {
            body: {
                permissions: "create:user"
            }
        }
    })


    test("Authorize validates and returns controller callback", () => {
        const result = createUserController.execute(request)
        expect(result.length).toBeGreaterThan(0);
    });

    test("Authorize throws error if user permissions in request don't contain \"create:user\"", async () => {
        request.body.permissions = "view:user"
        try {
            createUserController.execute(request)
        } catch (error) {
            expect(error.status).toBe(401);
            expect(error.title).toBe("Unauthorized");
        }
    });

});
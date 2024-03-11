# @authorize()
Typescript Method Decorator to protect API Controllers in your Node.js Application

# TLDR: 🤓 
Copy the code and add it somewhere in your project.
````ts
export function authorize(permission: string, policy?: string, role?: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const classMethod = descriptor.value;
        
        descriptor.value = (...args: any[]) => {
            
            // Your validation code here.
                
            /* For example:
            * const request = args.find(arg => arg.user)
            * const isAuthorized = request.user.permissions.includes(permission)
            * if (!isAuthorized) {
            *   throw new UnauthorizedError()
            * }
            * */
            
            return classMethod.apply(this, args);
        };
    }
}
````
# Usage ✏️
Add the @authorize() decorator method above your Controller methods and pass any params you may need:
````ts
export class CreateUserController {
    
    @authorize("permission-string-or-whatever")
    public execute(request: any): string {
        return randomUUID()
    }
}
````

# Important 🚨
Remember to enable experimentalDecorators compiler option in your tsconfig.json
````json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
````
## All set! 😎

Now let's see it in use in a little demo...

# DEMO

# Installation
Get your local clone of this repo and install dependencies:

````
git clone https://github.com/wimogas/ts-authorize-decorator
cd ts-authorize
npm install
````

# Launch the demo server
This demo RESTful API has a simple server running an Express.js App in `http://localhost:5000`.

````
npm run dev
...
Server started in PORT 5000
````

## 1. Sending an Authorized Request

```POST /demo```

### Body

````json
{
  "permissions": "create:user"
}
````
### Response

```200 Ok```

````json
{
  "result": "f5ab7da3-a5fe-46cc-92f8-c42021ce9570"
}
````

## 2. Sending an Unauthorized request

### Body

````json
{
  "permissions": "view:user"
}
````

### Response

```401 Unauthorized```

````json
{
    "status": 401,
    "title": "Unauthorized"
}
````


## How it works
The  @authorize() method decorator has some params which will be compared with the params passed to the Controller method.

The Controller:

````ts
export class CreateUserController {
    @authorize("create-user")
    public execute(request: any): string {
        return randomUUID()
    }
}
````
The @authorize() function:

````ts
export function authorize(permission: string, policy?: string, role?: string) {
    
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
        const classMethod = descriptor.value;
        
        descriptor.value = (...args: any[]) => {
            
            const request = args.find(arg => arg.user)
            
            const isAuthorized = request.user.permissions.includes(permission)
            
            if (!isAuthorized) {
                throw new UnauthorizedError()
            }
            
            return classMethod.apply(this, args);
        };
    }
}
````

So the @authorize() will check if

````ts
const isAuthorized = request.body.permissions.includes(permission)
````
And Throw an Error if it is `false`
````ts
if (!isAuthorized) {
    throw new UnauthorizedError()
}
````
Otherwise, it will  return a callback to the original Controller method (in this case the execute() method)
````ts
return classMethod.apply(this, args);
````

# License
[MIT](LICENSE.md)
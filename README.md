## Getting Started

First, clone the repository:

```bash
git clone git@github.com:Alayndev/Instagram-clone.git
```
You now have a new directory called 'Instagram-clone'. Let’s 'cd' into it:

```bash
cd /Instagram-clone
```

Install dependencies:

```bash
npm install
# or
yarn
```

Create a file called .env.local and inject the environment variables from .env.template into it:

```bash
.env.template --> .env.local
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br/>


## Build experience

In order to generate an optimized version of the application for production and test the performance achieved by using SSG (Static Site Generation), follow these steps:

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open a new tab in your terminal and build your application:

```bash
npm run build
# or
yarn build
```

Cut the development server:

```bash
Control + c
# or
⌘ + c
```

Start the Node.js server. This server supports all features of Next.js.:

```bash
npm run start
# or
yarn start
```

In this way, the HTML is generated at build time and will be reused on each request.It is important to mention that due to SSG, when you run the development server, you are building and generating the HTML. That is why it may take some time.

<br/>


## Backend architecture: MVC

Model: Classes that are responsible for communicating with the DB. Each Model/Class represents a database record. Moreover, each Class has its own methods to communicate with the database.

View: This section controls the request (req) and response (res) of the endpoint. Thus, if the request is correct, the View invokes the necessary Controllers.

Controller: Controllers are in charge of the business logic of the application, using the methods of the Model. Therefore, Controllers invoke the necessary Models to achieve the mentioned goal.

![MVC](https://user-images.githubusercontent.com/84744435/188996667-33991f4f-2893-42bf-90a0-352f4bcbb0b3.png)

<br/>


## Frontend architecture: [Atomic design](https://bradfrost.com/blog/post/atomic-web-design/)


Atoms: Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form input or a button. They have very little responsibility and functionality. They should be as 'plug and play' as possible. Think of them as the bricks of a wall.

Molecules: Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound. For instance, a form label, input or button aren’t too useful by themselves, but combine them together as a form and now they can actually do something together.

Organisms: Molecules give us some building blocks to work with, and we can now combine them together to form organisms. Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.

Templates: Templates consist mostly of groups of organisms stitched together to form pages.

Pages: Pages are specific instances of templates. 

![atomic-design](https://user-images.githubusercontent.com/84744435/189000998-1907e06b-3993-4f4c-9b65-3ae9d1142205.png)




<br/>

## Tech Stack and concepts applied

- Next
- React
- Node
- TypeScript
- Tailwind
- Axios
- React Hook Form
- Dropzone
- Yup
- Firebase
- API REST
- MVC
- Atomic design
- OOP
- Env Vars
- SSG (Static Site Generation)
- Lazy Loading
- Eslint

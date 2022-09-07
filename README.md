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
- OOP
- Env Vars
- SSG (Static Site Generation)
- Lazy Loading
- Eslint

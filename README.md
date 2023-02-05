
## Artificial Intelligence Marketplace (DEMO)

A demo e-commerce platform for showcasing and selling products with AI-generated product descriptions. Built with [Next.js](https://nextjs.org/), [GraphQL](https://graphql.org/), [MongoDB](https://www.mongodb.com/), [Apollo GraphQL](https://www.apollographql.com/), and [Co:here](https://cohere.ai/).

You can see the demo [HERE](https://e-commerce-ia.vercel.app/)

### Getting Started

1.  Clone the repository
```bash
git clone https://github.com/engeldlgado/e-commerce-ia.git
```
2.  Install the dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```
3. Add your free api from the next list and add it to your `.env.local`
- API key for [Co:here AI](https://dashboard.cohere.ai/register)
- API key for [Cloudinary](https://cloudinary.com/console/) and for the upload folder read this [documentation](https://cloudinary.com/documentation/upload_presets)
- Create a MongoDB Atlas database for free [here](https://account.mongodb.com/account/register)
```bash
MONGO_URI= #your mongo db server address

JWT_SECRET= #secret key of jwt, can be anything

# Cloudinary API Credentials
CLOUDINARY_API_KEY= #your api key
CLOUDINARY_API_SECRET= #your api secret
CLOUDINARY_NAME= #your user cloud name
CLOUDINARY_UPLOAD_PRESET= #your upload preset

# COHERE API Credentials
COHERE_API_KEY= #api key from cohere
```
5.  Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
4.  Open [http://localhost:3000](http://localhost:3000/) in your browser.
### Features
-   User-friendly interface for showcasing and selling products
-   AI-generated product descriptions for accurate and attractive representation
-   Login functionality, if you dont have an account u can create by entering any username and password, an account will be automatically created if you do not have one. This is for demonstration purposes only and no personal data is stored.
### Deployment
This demo application can be easily deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). For more information, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
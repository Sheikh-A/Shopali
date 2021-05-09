<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Readme Stats</h2>
</p>
 <p align="center">
    <a href="https://github.com/Sheikh-A/shopali/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/Sheikh-A/shopali?color=0088ff" />
    </a>
    <a href="https://github.com/Sheikh/shopali/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Sheikh-A/shopali?color=0088ff" />
    </a>
    <br />
    <br />
    <a href="https://a.paddle.com/v2/click/16413/119403?link=1227">
      <img src="https://img.shields.io/badge/Supported%20by-VSCode%20Power%20User%20%E2%86%92-gray.svg?colorA=655BE1&colorB=4F44D6&style=for-the-badge"/>
    </a>
    <a href="https://a.paddle.com/v2/click/16413/119403?link=2345">
      <img src="https://img.shields.io/badge/Supported%20by-Node%20Cli.com%20%E2%86%92-gray.svg?colorA=61c265&colorB=4CAF50&style=for-the-badge"/>
    </a>
</p>


![Ali's github stats](https://github-readme-stats.vercel.app/api?username=Sheikh-A&show_icons=true&hide=stars&theme=dark)
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Sheikh-A&hide=python)](https://github.com/Sheikh-A/shopali)


# Shopali RESTful APIs with Express
# Author: Ali Sheikh

#Frontend Deployed here: https://shopali.vercel.app/

#Backend Deployed here: https://backend-shopali.herokuapp.com/

#INSTRUCTIONS - https://shopali.vercel.app/
1. User must register an account to login (please note given we are using Heroku and a free instance, DB may be slow to respond)
2. Once registered user can login [might take a minute due to Heroku DB free instance]
3. There is Form Validation when registering a user (username must be unique and cannot be left blank, password cannot be blank)

I've built 3 different Image Upload options:

**A. Images & Add images (URL Upload) [Custom Built API endpoints]**

  -Images Tab displays all the images that have been uploaded via a URL, and has some base images already uploaded
  
  -Images Tab: User can delete images by clicking the button (NOTE: There might be a delay when interacting with Heroku backend, though if you refresh the page the image should be deleted)
  
  -Add Images is where user can upload an Image URL, Description, and Price; all three are required
  
  -Add Images also has Form Validation to make sure the User inputs are non-empty and contain the correct info

**B. Cloud Images & Cloud Upload: [Custom Built API endpoints]**

  -Cloud Images displays all images in the "shopali" cloudinary cloud instance
  
  -Cloud Upload: Here is where the User can upload an image from the user's own computer files
  
  -Cloud Upload: Images uploaded from here are uploaded directly to the Cloudinary cloud, and will be displayed afterwards on the Cloud Images tab

**C. Puppies: [Public API]**
  
  - This tab interacts with the public Dog CEO API [https://dog.ceo/] for Dog Images
  
  - Click on the type of dog you would like to see and they will populate on the page


#Backend Endpoints:
- https://backend-shopali.herokuapp.com/
- https://backend-shopali.herokuapp.com/api/auth
- https://backend-shopali.herokuapp.com/api/images (need to be logged in - POSTMAN)
- https://backend-shopali.herokuapp.com/api/cloudinary
- https://backend-shopali.herokuapp.com/api/users/admin     (need to be admin and logged in - POSTMAN)



## Authentication System
- Authentication.
- Express Middleware.
- JSON Web Tokens (JWTs).
- Hashing Passwords.
- Admin Control

User Authentication System: Hashs user's passwords before saving it to the database. Uses `JSON Web Tokens` to persist authentication across requests.

- Implements the `register` and `login` functionality inside `/auth/auth-router.js`. A `user` has `username` and `password`. Both properties are required.
- Implements the `authenticate` middleware inside `/auth/authenticate-middleware.js`.

Uses **JSON Web Tokens** to keep users authenticated across requests.

Admin Control: Uses middleware to check the "department" of user to see if they are "admin". Only admin can delete users & only admin can see all users.

### Design of the endpoints.

| Method | Endpoint      | Description                                                                                                                                                                                                                                                            |
| ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/auth/register | Creates a `user` using the information sent inside the `body` of the request. **Hashes the password** before saving the user to the database.                                                                                                                            |
| POST   | /api/auth/login    | Uses the credentials sent inside the `body` to authenticate the user. On successful login, creates a new JWT with the user id as the subject and sends it back to the image. If login fails, responds with the correct status code           |
| GET    | /api/users/admin    | If the user is logged in, responds with an array of all the users contained in the database. Only admin can view users.
| DELETE | /api/users/admin/:id    | If the user is logged in as admin (department = admin), will delete user with specified id.

## Backend API Overview:

- Express Routing
- Reading Request data from body and URL parameters
- Sub-routes
- API endpoints & HTTP Codes
## Description

Uses `Node.js` and `Express` to build the Shopali API that performs _CRUD_ operations on `given data`.

### Database Persistence Helpers

The `data` folder contains a database populated with test `objects`.

Database access will be done using the `dbConfig.js` file included inside the `data` folder.

### Users Model

This module controls the users registered for the application. Functions require {"department":"admin"} to access and has the following methods:
Admin privaleges are created via the custom middleware file called: "check-role-middleware", created to check if a user's department = admin.  

- `find()`: calling find returns a promise that resolves to an array of all the `users` contained in the database, must be admin to view.
- `remove()`: the remove method accepts an `id` as its first parameter and upon successfully deleting the user from the database, must be admin to delete.


### Images_Model
This module allows user to upload a URL of an image, add its description and add its price. Also allows users to view all these image URL uploads. 
Helpers are set up with the `image-model.js` and the following methods are created:

- `find()`: calling find returns a promise that resolves to an array of all the `images` contained in the database.
- `findById()`: this method expects an `id` as it's only parameter and returns the image corresponding to the `id` provided or an empty array if no image with that `id` is found.
- `add()`: calling add passing it a `image` object will add it to the database and return an object with the `id` of the inserted image. The object looks like this:
    `{
        "id": 1,
        "image_url": "www.dogceo.com/image/1",
        "description": "Dog ball"
        "price": 10.42
    },` The id is auto-generated while the user has to input image_url, description, and price
- `update()`: accepts three arguments, the first is the `id` of the image to update and the second is an object with the `changes` to apply. It returns the updated record. The id is taken from the URI. Here are the inputs:
        `{
            "id": "Test1",
            "image_url": "www.dogceo/com/image/2",
            "description": "Dog 2",
            "price": 100.00

        },`
- `remove()`: the remove method accepts an `id` as its first parameter and upon successfully deleting the image from the database it returns the image_id that was deleted.
- `findAllImages()`: returns a list of all the image URLs

### Cloudinary Model
- Requires a CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET which are defined as env variables in Heroku and a .env file in local instance
- `get`: calling returns a list of images in the specific cloud repository using CLOUD_NAME
- `post`: calling post adds an image from your computer files directly uploaded to the Cloudinary cloud  

### Users Schema
Registering Users in the database:

```js
{
  "id": 1, //Autogenerated
  "username": "Ali", //STRING required, unique
  "password": "SMB", //STRING required
  "department": "admin", //STRING optional
}
```

### Image API image Schema

image in the database has the following structure:

```js
{
  "id": 1, //Autogenerated
  "image_url": "Test1", //Valid URL required
  "description": "SMB", //STRING required
  "price": 10.80, //Number required
  "created_at": "2020-12-01 08:35:28", //Autogenerated
  "updated_at": "2020-12-01 08:35:28".  //Autogenerated
}
```

### Cloudinary Schema

A Cloud in the database has the following structure:

```js
{
  "filename": 1, //Unique generated from image upload
},
```
### Endpoints

Shopali API Endpoints

| Method | Endpoint                | Description                                                                                                                                                                 |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/images             | Creates an image using the information sent inside the `request body`.                                                                                                        |
| POST   | /api/cloudinary         | Uploads an image from your computer files to the Cloudinary cloud instance                                                                                                    |
| GET    | /api/images              | Returns an array of all the image objects contained in the database.                                                                                                         |
| GET    | /api/images/:id          | Returns the image object with the specified id.                                                                                                                              |
| DELETE | /api/images/:id          | Removes the image with the specified id and returns the deleted image id                                            |
| PUT    | /api/images/:id          | Updates the image with the specified `id` using data from the `request body`. Returns the modified document.                   

### SAMPLE END POINTS TO USE WITH POSTMAN / INSOMNIA
- API  |  https://backend-shopali.herokuapp.com                          | [AUTH not required]
- GET  |  https://backend-shopali.herokuapp.com/api/images               | [AUTH required]
- GET  |  https://backend-shopali.herokuapp.com/api/images/1             | [AUTH required]
- GET  |  https://backend-shopali.herokuapp.com/api/cloudinary           | [AUTH required]
- POST |  https://backend-shopali.herokuapp.com/api/images               | [AUTH required]
- POST |  https://backend-shopali.herokuapp.com/api/cloudinary           | [AUTH required]
- DEL  |  https://backend-shopali.herokuapp.com/images/2                 | [AUTH required] 
- PUT  |  https://backend-shopali.herokuapp.com/api/images/1             | [AUTH required] 

Auth:
- POST | https://backend-shopali.herokuapp.com/api/auth/login
- POST | https://backend-shopali.herokuapp.com/api/auth/register
- POST | https://backend-shopali.herokuapp.com/api/auth/login (use Authorization header + token generated if success)
- GET  | https://backend-shopali.herokuapp.com/api/users/admin (must be admin)
- DEL  | https://backend-shopali.herokuapp.com/api/users/admin/2 (must be admin)

### Backend Testing
- Each model in the backend has an assoicated test file in the same folder
- Test run via `npm run test` and uses Jest framework
- All tests passing currently

### Front End
- Front end is built & deployed using create-react-app (deployed via Vercel)
- Uses Axios & AxiosWithAuth for endpoints
    -error handling for all async (axios/AJAX) calls
- React Forms
- Adding in Form Validation using Yup / Formik for the Registration & Image pages 
- Fetches data from Shopali API above, link is from Heroku
- Uses React Router
- Styled-Components / Material UI for design
- Dog CEO API built into front-end for fun, this is accessable without logging in.
- Added responsiveness to website for extra large screen @2000px and mobile view @500px

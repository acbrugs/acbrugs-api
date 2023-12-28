# ACBrugs API Documentation

## Introduction

Welcome to the ACBrugs API, a RESTful service designed to manage a digital portfolio of rugs. This API allows for operations related to rug collections and user authentication, ensuring a dynamic and responsive web application.

The API is currently hosted at [https://api.acbrugs.com](https://api.acbrugs.com) and is powered by Node.js with Express, using MongoDB for data persistence.

## Base URL

All API requests should be made to the base URL: https://api.acbrugs.com

## Backend Highlights

- **RESTful API**: Supports full CRUD operations for rugs and rug types.
- **Data Modeling**: Node.js models define data structures and validate interactions.
- **Security**: Middleware ensures authenticated access and protects endpoints.
- **Image Management**: Cloudinary integration for high-quality image uploads and storage.
- **Utilities**: Common functions, such as JWT authentication, are abstracted for cleaner code.


## API Endpoints

Below you will find a structured documentation of all the available API endpoints, their methods, required parameters, and access restrictions.


### Rugs

#### Get All Rugs
- **GET** `/api/v1/rugs`
- Retrieves a list of all rugs available in the portfolio.
- Access: Public

#### Create Rug
- **POST** `/api/v1/rugs`
- Creates a new rug entry in the database.
- Access: Admin only

#### Get Rugs by Type
- **GET** `/api/v1/rugs/type/:rugTypeId`
- Retrieves all rugs filtered by a specific type.
- Parameters: `rugTypeId` (URL parameter)
- Access: Public

#### Get Rug by ID
- **GET** `/api/v1/rugs/:id`
- Fetches a single rug based on its ID.
- Parameters: `id` (URL parameter)
- Access: Public

#### Update Rug
- **PUT** `/api/v1/rugs/:id`
- Updates the details of an existing rug.
- Parameters: `id` (URL parameter)
- Access: Admin only

#### Delete Rug
- **DELETE** `/api/v1/rugs/:id`
- Removes a rug entry from the database.
- Parameters: `id` (URL parameter)
- Access: Admin only

### Rug Types

#### Get All Rug Types
- **GET** `/api/v1/rugTypes`
- Retrieves a list of all rug types.
- Access: Public

#### Create Rug Type
- **POST** `/api/v1/rugTypes`
- Adds a new rug type to the collection.
- Access: Admin only

#### Get Rug Type by ID
- **GET** `/api/v1/rugTypes/:id`
- Fetches a single rug type based on its ID.
- Parameters: `id` (URL parameter)
- Access: Public

#### Update Rug Type
- **PUT** `/api/v1/rugTypes/:id`
- Updates information for an existing rug type.
- Parameters: `id` (URL parameter)
- Access: Admin only

#### Delete Rug Type
- **DELETE** `/api/v1/rugTypes/:id`
- Deletes a rug type from the database.
- Parameters: `id` (URL parameter)
- Access: Admin only

### User Authentication

#### User Registration
- **POST** `/api/users/register`
- Registers a new user to the platform.
- Access: Public

#### User Login
- **POST** `/api/users/login`
- Authenticates a user and establishes a session.
- Access: Public

#### User Logout
- **GET** `/api/users/logout`
- Ends the user's session and logs them out.
- Access: Public

## Access Control

The API uses middleware for authentication (`protect`) and role-based access control (`restrictToAdmin`). These ensure that certain actions can only be performed by authenticated users with admin privileges.

## Responses

All endpoints return JSON formatted responses. Successful requests typically return a `200 OK` status code along with the requested data or confirmation of action. Failed requests will return appropriate error messages and status codes, such as `401 Unauthorized` for access control violations or `404 Not Found` for invalid resource requests.

## Contributing

We welcome contributions from the community. If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license. See the [LICENSE](LICENSE.md) file for more information.

---

Thank you for visiting the ACBrugs Portfolio Website repository. For any queries or support, reach out to the project maintainers.

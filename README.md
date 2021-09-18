
![Logo](https://i.postimg.cc/xjB3ch1T/p-Tqr-Ex-Xac.jpg)

    
# User Filter Application

The User Filter Application aims at viewing users stored in the databae whilst filtering through users' interests and work categories.
The application was built with nestJS (backend) and reactJS (frontend).

## Project Link


[user-filter-nest-app](https://user-management-nest-backend.herokuapp.com/api)

[user-filter-react-app](https://users-filter-react-app.herokuapp.com/users)

## Screenshots

![App Screenshot](https://i.postimg.cc/3NjNrkwG/Screenshot-2021-09-18-18-44-42.png)

  
## Getting Started

**user-filer-nest-app**

- **Clone the project**

```bash
   git clone -b main https://github.com/olasoj/user-filer-nest-app.git
```

- **Define the required environment variables**

| S/N | Environment Variable | Description                                                      |
| --- | -------------------- | ---------------------------------------------------------------- |
| 1   | DB\_CONNECTION       | Database connection: postgres                                    |
| 2   | DB\_HOST             | Database host                                                    |
| 3   | DB\_USERNAME         | Database username                                                |
| 4   | DB\_PASSWORD         | Database password                                                |
| 5   | DB\_NAME             | Database name                                                    |
| 6   | DB\_PORT:            | Database port                                                    |
| 7   | DB\_SYNCHRONIZE      | Database synchronization: true                                   |
| 8   | DB\_LOGGING          | Database logging: true                                           |
| 9   | DB\_ENTITIES         | Value: "./src/\*\*/model/entity/\*.js, ./dist/\*\*/entity/\*.js" |

- **Go to the project directory**

```bash
  cd user-filer-nest-app
```

- **Start the user-filer-nest-app**

```bash
    npm install
    npm run start:dev
```

**user-filer-react-app**

- **Clone the project**

```bash
   git clone -b master https://github.com/olasoj/user-filter-react-app.git
```

- **Go to the project directory**

```bash
    cd user-filter-react-app 
 ```

- **Start the user-filer-react-app**

```bash
    npm install
    npm run start
```

## Features

- Pagination
- Filtering
- User removal
- User creation

  
## Documentation

[Documentation](https://rosenic-q3-api-doc.surge.sh/)

  
## Authors

- [@olasoj](https://www.github.com/olasoj)

  
## Tech Stack

**Client:** React, BootStrap

**Server:** NestJS

**Database**: postgresql

  
To set up a Docker environment with MySQL and a web interface for database management, you can use `phpMyAdmin` instead of `pgAdmin`, as `pgAdmin` is specifically designed for PostgreSQL databases. `phpMyAdmin` is a popular tool for managing MySQL databases via a web interface.

Below is a `docker-compose.yml` file that configures a MySQL server and phpMyAdmin for managing it:

```yaml
version: '3.8'

services:
  mysql-server:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: your_database
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    restart: always

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    depends_on:
      - mysql-server
    environment:
      PMA_HOST: mysql-server
      PMA_PORT: 3306
      PMA_USER: root
      PMA_PASSWORD: rootpassword
    ports:
      - "8080:80"
    restart: always

volumes:
  mysql-data:
```

### Explanation:
- **mysql-server**: This service runs MySQL Server. It uses the official MySQL image. The environment variables set the root password, a user, a password for that user, and a database.
- **phpmyadmin**: This service runs phpMyAdmin, which connects to the MySQL server. It is configured to recognize the MySQL service by its service name `mysql-server` within the Docker network created by Docker Compose. It is accessible via port 8080 on your local machine.
- **volumes**: The `mysql-data` volume is used to persist the MySQL database data even after the container stops.

### Steps to Run:
1. Save the above `docker-compose.yml` in a directory.
2. Open a terminal and navigate to the directory containing the `docker-compose.yml` file.
3. Run `docker-compose up` to start both the MySQL server and phpMyAdmin.
4. Access phpMyAdmin in your web browser at `http://localhost:8080`.

With this setup, you can manage your MySQL database through phpMyAdmin by logging in with the user credentials specified in the Docker Compose file (by default, root and the password you set). If you have any other specifications or need adjustments, let me know!
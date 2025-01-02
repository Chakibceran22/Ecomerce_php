# E-commerce Website

A dynamic e-commerce platform built with PHP, JavaScript, and HTML, running on WAMP server.

## Features

- User registration and login system
- Product catalog 
- Shopping cart functionality
- Secure checkout process
- Order management system
- Admin panel for product management
- Responsive design for all devices
- Order history tracking
- Search functionality

## Technology Stack

- Backend: PHP
- Frontend: HTML, CSS, JavaScript
- Server: WAMP (Windows, Apache, MySQL, PHP)
- Database: MySQL
- Additional: jQuery for AJAX requests

## Prerequisites

Before installation, ensure you have:
- WAMP Server (Latest version)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web browser (Chrome, Firefox, etc.)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Chakibceran22/Ecomerce_php
```

2. Set up the local environment:
- Install WAMP Server
- Start WAMP Server (wait for the icon to turn green)
- Verify PHP and MySQL are running correctly

3. Database setup:
- Open phpMyAdmin (http://localhost/phpmyadmin)
- Create a new database named 'ecommerce_db'
- Import the database schema from `database/schema.sql`

4. Project setup:
- Copy the project files to your WAMP www directory:
  ```
  C:\wamp64\www\your-project-name
  ```
- Configure database connection in `config/database.php`:
  ```php
  $host = 'localhost';
  $dbname = 'ecommerce_db';
  $username = 'root';
  $password = ''; // default WAMP password is blank
  ```



## Running the Application

1. Start WAMP Server
2. Open your web browser
3. Navigate to: `http://localhost/your-project-name`

## Admin Access

To access the admin panel:
1. Go to `http://localhost/TP_Projects/Ecomerce/views/loginPage.html`
2. Default admin credentials:
   - Username: admin
   - Password: admin123
   (Remember to change these credentials immediately)

## Features Implementation

### User Module
- Registration and login system
- Profile management
- Order history
- Shopping cart management

### Product Module
- Product listing 
- Product search
- Product details
- Image gallery

### Admin Module
- Product management (CRUD operations)
- Order management
- User management

## Security Measures

- Password hashing
- SQL injection prevention
- XSS protection
- CSRF protection
- Input validation
- Secure session management

## Backup

To backup your database:
1. Open phpMyAdmin
2. Select your database
3. Click "Export"
4. Choose "Quick Export" and "SQL"
5. Click "Go"

## Troubleshooting

Common issues and solutions:

1. WAMP shows red/orange icon:
   - Check if ports 80 and 3306 are free
   - Verify Apache and MySQL services are running

2. Database connection fails:
   - Verify MySQL service is running
   - Check database credentials in config file
   - Ensure MySQL port is correct

3. File upload issues:
   - Check PHP upload_max_filesize in php.ini
   - Verify folder permissions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a Pull Request



## Contact

Your Name - Graba Chakib 
Project Link: [https://github.com/yourusername/ecommerce-website](https://github.com/Chakibceran22/Ecomerce_php)

## Acknowledgments

- WAMP Server team
- PHP community
- jQuery team
- Bootstrap team (if used)
- All contributors and supporters

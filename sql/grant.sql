CREATE USER `pattern-user`@`%` IDENTIFIED BY 'pattern-user-password'; 
GRANT ALL PRIVILEGES ON `pattern`.* TO `pattern-user`@`%`;

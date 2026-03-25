CREATE TABLE User (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    username VARCHAR(50)
);

CREATE TABLE Semester (
    semester_id INT PRIMARY KEY,
    semester_name VARCHAR(50),
    start_date DATE,
    end_date DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
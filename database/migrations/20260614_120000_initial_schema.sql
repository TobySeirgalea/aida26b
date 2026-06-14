CREATE TABLE tutors (
    username VARCHAR(20) PRIMARY KEY
);

CREATE TABLE childs (
    tutors_username VARCHAR(20) NOT NULL REFERENCES tutors(username),
    username   VARCHAR(20) PRIMARY KEY
);

CREATE TABLE courses (
    name   VARCHAR(100) NOT NULL PRIMARY KEY,
    status VARCHAR(20)    
);

CREATE TABLE childs_enrollments (
    courses_name               VARCHAR(100) NOT NULL REFERENCES courses(name), 
    childs_username          VARCHAR(20)  NOT NULL REFERENCES childs(username),
    enrollment_date           DATE DEFAULT CURRENT_DATE,
    grade                     NUMERIC(5,2),
    status                    VARCHAR(20),
    PRIMARY KEY (courses_name, childs_username, enrollment_date)
);
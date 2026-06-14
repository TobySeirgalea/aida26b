CREATE TABLE parents (
    username VARCHAR(20) PRIMARY KEY,
);

CREATE TABLE children (
    parents_username VARCHAR(20) NOT NULL REFERENCES parents(username)
    child_username   VARCHAR(20) PRIMARY KEY
);

CREATE TABLE courses (
    course_name   VARCHAR(100) NOT NULL PRIMARY KEY,
    course_status VARCHAR(20)    
);

CREATE TABLE child_enrollments (
    course_name               VARCHAR(100) NOT NULL REFERENCES courses(course_name) 
    student_username          VARCHAR(20)  NOT NULL REFERENCES children(child_username)
    students_parents_username VARCHAR(20)  NOT NULL REFERENCES children(parents_username),
    enrollment_date           DATE DEFAULT CURRENT_DATE(),
    grade                     NUMERIC(5,2),
    status                    VARCHAR(20),
    PRIMARY KEY (course_name, student_username, students_parents_username, enrollment_date)
);

CREATE TABLE students (
    numero_libreta  VARCHAR(20) PRIMARY KEY,
    dni             VARCHAR(20) NOT NULL,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    email           VARCHAR(255),
    enrollment_date DATE,
    status          VARCHAR(50)
);

CREATE TABLE subjects (
    cod_mat     VARCHAR(20) PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    description TEXT,
    credits     INTEGER,
    department  VARCHAR(100)
);

CREATE TABLE enrollments (
    numero_libreta  VARCHAR(20) REFERENCES students(numero_libreta),
    cod_mat         VARCHAR(20) REFERENCES subjects(cod_mat),
    enrollment_date DATE NOT NULL,
    grade           NUMERIC(5,2),
    status          VARCHAR(50),
    PRIMARY KEY (numero_libreta, cod_mat)
);

CREATE INDEX idx_students_status    ON students(status);
CREATE INDEX idx_enrollments_status ON enrollments(status);

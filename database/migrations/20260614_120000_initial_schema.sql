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

-- Condiciones para extender:
-- Si se quiere añadir una foreign key a una tabla T que referencia a una columna C de otra tabla T', entonces en la tabla T debemos agregar esa columna respetando la siguiente nomenclatura: T'_C
-- Es decir, que debemos poner el nombre de la tabla a la que hace referencia seguido de '_' y del nombre de la columna de dicha tabla.  
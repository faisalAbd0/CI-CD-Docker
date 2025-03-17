USE student_grades;

CREATE TABLE IF NOT EXISTS student (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    grade DECIMAL(5,2) NOT NULL
);

-- INSERT INTO student (name, grade) VALUES ('test', 95.50);

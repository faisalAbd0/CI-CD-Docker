FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=faisal123  
ENV MYSQL_DATABASE=student_grades   
ENV MYSQL_USER=faisal               
ENV MYSQL_PASSWORD=faisal123        

COPY init.sql /docker-entrypoint-initdb.d/


-- Tabla acudientes
create table acudientes (
    id_acudiente serial primary key,
    nombre varchar(100),
    apellido varchar(100),
    telefono varchar(50),
    correo varchar(100),
    parentesco varchar(50)
);

-- Tabla cursos
create table cursos (
	id_cursos serial primary key,
	nom_cursos varchar(50)
);

-- Tabla docentes
create table docentes (
    id_docente serial primary key,
    nombre varchar(100),
	apellido varchar(100),
    documento bigint,
    correo varchar(100),
    telefono varchar(50),
    materia varchar(100)
);

-- Tabla grados
create table grados (
    id_grado serial primary key,
    nombre_grado varchar(50),
    id_docente int,
    foreign key (id_docente) references docentes(id_docente)
);

-- Tabla estudiantes
create table estudiantes (
    id_estudiante serial primary key,
    nombre varchar(100),
    apellido varchar(100),
    documento bigint,
    genero varchar(10),
    id_acudiente int,
    id_grado int,
	id_cursos int,
    foreign key (id_acudiente) references acudientes(id_acudiente),
    foreign key (id_grado) references grados(id_grado),
	foreign key (id_cursos) references cursos(id_cursos)
);

-- Tabla materias
create table materias (
    id_materia serial primary key,
    nombre_materia varchar(100),
    id_docente int,
    foreign key (id_docente) references docentes(id_docente)
);

-- Tabla notas
create table notas (
    id_nota serial primary key,
    id_estudiante int,
    id_materia int,             
    periodo varchar(50),
    calificacion decimal(5,2),
    foreign key (id_estudiante) references estudiantes(id_estudiante),
    foreign key (id_materia) references materias(id_materia)
);


INSERT INTO acudientes (nombre, apellido, telefono, correo, parentesco) VALUES
('Carlos','Gómez','3001111111','carlosg@gmail.com','Padre'),
('María','López','3001111112','marial@gmail.com','Madre'),
('Jorge','Díaz','3001111113','jorged@gmail.com','Padre'),
('Lucía','Rojas','3001111114','luciar@gmail.com','Madre'),
('Pedro','Ramírez','3001111115','pedror@gmail.com','Padre'),
('Marta','Sánchez','3001111116','martas@gmail.com','Madre'),
('Sergio','Pérez','3001111117','sergiop@gmail.com','Padre'),
('Nora','García','3001111118','norag@gmail.com','Madre'),
('Andrés','Torres','3001111119','andrest@gmail.com','Padre'),
('Paola','Castro','3001111120','paolac@gmail.com','Madre'),
('Luis','Martínez','3001111121','luism@gmail.com','Padre'),
('Elena','Suárez','3001111122','elenas@gmail.com','Madre'),
('Ricardo','Gómez','3001111123','ricardog@gmail.com','Padre'),
('Viviana','Ortiz','3001111124','vivianao@gmail.com','Madre'),
('Javier','Peña','3001111125','javierp@gmail.com','Padre'),
('Natalia','Jiménez','3001111126','nataliaj@gmail.com','Madre'),
('Hugo','Mendoza','3001111127','hugom@gmail.com','Padre'),
('Claudia','Díaz','3001111128','claudiad@gmail.com','Madre'),
('Felipe','Cárdenas','3001111129','felipec@gmail.com','Padre'),
('Andrea','Silva','3001111130','andreas@gmail.com','Madre'),
('Julio','Herrera','3001111131','julioh@gmail.com','Padre'),
('Camila','Ruiz','3001111132','camilar@gmail.com','Madre'),
('Esteban','Vargas','3001111133','estebanv@gmail.com','Padre'),
('Rosa','Franco','3001111134','rosaf@gmail.com','Madre'),
('Gabriel','Cote','3001111135','gabrielc@gmail.com','Padre'),
('Laura','Prieto','3001111136','laurap@gmail.com','Madre'),
('Tomás','Muñoz','3001111137','tomasm@gmail.com','Padre'),
('Carolina','Lara','3001111138','carolinal@gmail.com','Madre'),
('Alejandro','Reyes','3001111139','alejandror@gmail.com','Padre'),
('Tatiana','León','3001111140','tatianal@gmail.com','Madre');

INSERT INTO cursos (nom_cursos) VALUES
('Curso A'),
('Curso B'),
('Curso C');


INSERT INTO docentes (nombre, apellido, documento, correo, telefono, materia) VALUES
('María','Herrera',1001,'mariah@colegio.com','3002000001','Matemáticas'),
('Carlos','Soto',1002,'carloss@colegio.com','3002000002','Ciencias Naturales'),
('Laura','Díaz',1003,'laurad@colegio.com','3002000003','Español'),
('Pedro','Gómez',1004,'pedrog@colegio.com','3002000004','Inglés'),
('Diana','Ramírez',1005,'dianar@colegio.com','3002000005','Educación Física'),
('Javier','Torres',1006,'javiert@colegio.com','3002000006','Informática'),
('Sandra','Rojas',1007,'sandrar@colegio.com','3002000007','Sociales'),
('Andrés','Peña',1008,'andresp@colegio.com','3002000008','Arte'),
('Marta','González',1009,'martag@colegio.com','3002000009','Religión'),
('Luis','Pérez',1010,'luisp@colegio.com','3002000010','Tecnología');


INSERT INTO grados (nombre_grado, id_docente) VALUES
('Preescolar',1),
('Primero',2),
('Segundo',3),
('Tercero',4),
('Cuarto',5),
('Quinto',6),
('Sexto',7),
('Séptimo',8),
('Octavo',9),
('Noveno',10),
('Décimo',1);


INSERT INTO materias (nombre_materia, id_docente) VALUES
('Matemáticas',1),
('Ciencias Naturales',2),
('Español',3),
('Inglés',4),
('Educación Física',5),
('Informática',6),
('Sociales',7),
('Arte',8),
('Religión',9),
('Tecnología',10);


INSERT INTO estudiantes (nombre, apellido, documento, genero, id_acudiente, id_grado, id_cursos) VALUES
('Juan','Pérez',2001,'Masculino',1,11,1),
('Ana','Gómez',2002,'Femenino',2,11,1),
('Carlos','Ruiz',2003,'Masculino',3,11,1),
('Luisa','Díaz',2004,'Femenino',4,11,1),
('Miguel','Rojas',2005,'Masculino',5,11,1),
('Valentina','Silva',2006,'Femenino',6,11,1),
('David','López',2007,'Masculino',7,11,1),
('Laura','Castro',2008,'Femenino',8,11,1),
('Andrés','Ramírez',2009,'Masculino',9,11,1),
('Sofía','Jiménez',2010,'Femenino',10,11,1),
('Diego','Torres',2011,'Masculino',11,11,2),
('Camila','Herrera',2012,'Femenino',12,11,2),
('Mateo','Mendoza',2013,'Masculino',13,11,2),
('Paula','Suárez',2014,'Femenino',14,11,2),
('Nicolás','Martínez',2015,'Masculino',15,11,2),
('Sara','Ortiz',2016,'Femenino',16,11,2),
('Daniel','Cárdenas',2017,'Masculino',17,11,2),
('Isabella','Franco',2018,'Femenino',18,11,2),
('Samuel','Vargas',2019,'Masculino',19,11,2),
('Lucía','Prieto',2020,'Femenino',20,11,2),
('Tomás','Muñoz',2021,'Masculino',21,11,3),
('Valeria','Lara',2022,'Femenino',22,11,3),
('Esteban','Reyes',2023,'Masculino',23,11,3),
('Mariana','León',2024,'Femenino',24,11,3),
('Juliana','Cote',2025,'Femenino',25,11,3),
('Sebastián','Peña',2026,'Masculino',26,11,3),
('Emilia','Ruiz',2027,'Femenino',27,11,3),
('Martín','Ramírez',2028,'Masculino',28,11,3),
('Gabriela','Díaz',2029,'Femenino',29,11,3),
('José','Rojas',2030,'Masculino',30,11,3);


INSERT INTO notas (id_estudiante, id_materia, periodo, calificacion)
SELECT e.id_estudiante, m.id_materia, p.periodo,
       ROUND((2.5 + RANDOM() * 2.5)::numeric, 2) AS calificacion
FROM estudiantes e
CROSS JOIN materias m
CROSS JOIN (VALUES ('1'), ('2'), ('3'), ('4')) AS p(periodo);

select * from notas;


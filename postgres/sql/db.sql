SET timezone = 'America/Santiago';

DROP DATABASE IF EXISTS distri;
CREATE DATABASE distri;
\c distri;
CREATE TABLE logs (
    id int NOT NULL,
    title varchar NOT NULL,
    description timestamp NOT NULL,
    keywords int,
    URL varchar
);
\copy logs FROM '/docker-entrypoint-initdb.d/user-ct-test-collection-04.txt' DELIMITER E'\t' CSV HEADER;
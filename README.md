# CRUD BACKEND

This version currently supports:

- Knex
- MySQL

## Create table script

```sql
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description_UNIQUE` (`description`)
) ENGINE=InnoDB
```

## Endpoint test

```
http://localhost:8080
```

## Basic database operations and testing.

### Examples

> Insert

```sh
curl --location --request POST 'http://localhost:8080/knex/category' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description": "Category 1"
}'
```

> Update

```sh
curl --location --request PUT 'http://localhost:8080/knex/category' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "description": "Category 1.0"
}'
```

### Select all

```sh
curl --location --request GET 'http://localhost:8080/knex/category'
```

### Select by code

```sh
curl --location --request GET 'http://localhost:8080/knex/category/1'
```

### Delete

```sh
curl --location --request DELETE 'http://localhost:8080/knex/category/1'
```

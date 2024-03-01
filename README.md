# Bem vindo ao backend do projeto Gym Progress

Abaixo estão as instruções para rodar o backend do projeto localmente.

Crie um container docker com o comando:

```bash
docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo:7
```

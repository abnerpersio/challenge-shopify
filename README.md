# Desafio Shopify

---

## Como rodar o projeto

1. Faça o clone do projeto

abra o terminal e rode o comando `git clone https://github.com/abnerpersio/shopify-challenge.git`

2. Entre na pasta 'shopify-challenge'

ainda no terminal, rode o comando `cd shopify-challenge`

3. Não usando docker

se você não tem o Docker. Acesse o arquivo `index.js` dentro da pasta `server/src/database` e altere as configurações do banco de dados para um banco de dados

4. Usando docker (recomendado)

### Comandos Docker (utilizando docker compose)

```
$ docker-compose up --build
```

Caso esteja no Windows, a aplicação estará rodando em http://192.168.99.100:8080/. Se não, estará rodando em localhost

Para os endpoints da API, a url base é `http://192.168.99.100:3000/`

Para acessar a interface, a url é `http://192.168.99.100:3000/web/`

A documentação das rotas (formato: Insomnia Rest JSON) está no arquivo `docs/docs-insomnia.json`

Para rodar a documentação, no terminal rode o comando `npx insomnia-documenter docs-insomnia.json` na pasta `docs`

Após isso, basta rodar o comando `npx serve` e acessar `http://localhost:5000`

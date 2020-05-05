# futuretube-backend

## Stack
Esse é um projeto de Backend feito utilizando NodeJS, Express, jwt, Typescript e MySQL. Além disso, ele segue uma arquitetura em camadas simples:
1. Presentation: responsável pela comunicação com agentes externos (como o Frontend)
1. Data: responsável pela comunicação direta com o banco de dados
1. Business: responsável pela lógica de negócio
Por fim, ressalta-se que a comunicação da camada `Data` e a `Business` é feita através de interfaces denominadas `Gateway`, para possibilitar os testes unitários desta última camada (inversão de dependências).

## Sobre
Esse foi um projeto de Backend que utilizei para reproduzir o funcionamento do sistema que o YouTube utiliza, nele é possivel se cadastrar, fazer login e também atualizar a senha de usuário. Além disso o usuário pode criar, ler, e deletar vídeos.

## API

- [API](https://documenter.getpostman.com/view/10236954/SzezdXbz?version=latest)

## Instruções para rodar
As instruções são:
1. `npm install` para instalar todas as dependências;
1. `npm run start` para rodar localmente o projeto
1. `npm run build` para gerar uma versão possível de ser deployada com os arquivos transpilados para Javascript


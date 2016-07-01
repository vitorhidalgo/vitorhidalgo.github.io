# Portfólio Vitor Hidalgo 

* http://www.vitorhidalgo.com.br
* https://portfolio-vitorhidalgo.herokuapp.com/
* https://github.com/vitorhidalgo/portfolio

Instruções para configuração do Projeto.

## NodeJS - [node.js]
Instalar o NodeJS, seguir os passos em [node.js]
Para verificar se o nodeJS já está instalado rodar o comando:
```sh
$ node -v
```
- Para atualizar o node rodar o comando:
```sh
$ npm install npm -g
```

## GULP - [Gulp]
Para verificar se o Gulp está instalado rodar o comando:
```sh
$ gulp -v
```
Se não estiver instalado. Rodar o comando:
```sh
$ npm install --global gulp-cli
```

**Instalar as dependências do GULP**

Ir até a raiz do projeto, onde se encontra o arquivo gulpfile.js e package.json e rodar o seguinte comando:
```sh
$ npm install
```

## BOWER - [bower]
Instalar o Bower, seguir os passos em [bower]
Para verificar se o Bower já está instalado rodar o comando:
```sh
$ bower -v
```
Se não estiver instalado. Rodar o comando:
```sh
$ npm install -g bower
```

**Instalar as libs ou plugins do BOWER**

Ir até o diretório do projeto (html/www) que se encontra o arquivo bower.json e rodar o seguinte comando:
```sh
$ bower install
```

Depois de instalado todas libs/plugins rodar o seguinte comando:
```sh
$ gulp vendor
```

## SASS - [Sass]
Para gerar o SASS, rodar o seguinte comando:
```sh
$ gulp sass
```

## Sublime Text
Para configurar o Sublime Text quando você salvar algum arquivo SASS, configurar o 'project' no projeto.
Ir no menu Project > Edit Project e colocar a instrução:

```
    ,
    "Gulp": 
    {
      "check_for_gulpfile":true,
      "tasks_on_save": 
      {
        "sass": ["sass/*.scss"]
      },
      "results_autoclose_timeout_in_milliseconds": 1500
    }
```

E salvar algum arquivo SASS no diretório /sass.

   [node.js]: <http://nodejs.org>
   [Gulp]: <http://gulpjs.com>
   [Sass]: <http://sass-lang.com/>
   [bower]: <https://bower.io/>
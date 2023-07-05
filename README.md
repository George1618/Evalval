
# EVALVAL

## Sobre

**Evalval** é um aplicativo que executa o código que lhe é fornecido em Python pelo usuário, utilizando as funções [eval](https://docs.python.org/3/library/functions.html#eval) ou [exec](https://docs.python.org/3/library/functions.html#exec) do Python. Seu nome e sua paleta de cores se baseiam em uma [carta](https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&cid=9821).

---

## Arquitetura

O aplicativo é construído em Python, utilizando o _framework_ [Flask](https://flask.palletsprojects.com/en/2.3.x/) para a criação do cliente, partindo de um HTML como _template_; e por um servidor, que renderiza o cliente (_Server-Side Rendering_) e também manipula os dados do cliente (pela rota _/api_).

---

## Estrutura

- **.venv/** : ambiente virtual do Python responsável pelas dependências e afins.

- **static/** : contém os arquivos de estilo e scripts usados pela página do aplicativo (_index.html_):

    - **editor.js** : responsável pela identação no campo de entrada do código.

    - **fetch.js** : faz a conexão cliente-servidor (_do formulário com a api local_) por meio da [API Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

    - **style.css** : estilização CSS do _index.html_.

- **templates/** : contém os arquivos necessários para o _app.py_ construir o _front-end_ do aplicativo:

    - **index.html** : [template](https://flask.palletsprojects.com/en/2.3.x/quickstart/#rendering-templates) da única página web do _front-end_ do aplicativo.

- **app.py** : responsável por rodar tanto o servidor quanto o cliente (afinal o servidor renderiza o cliente).
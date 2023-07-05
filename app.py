from flask import Flask, render_template, request, url_for

# montagem do aplicativo em Flask
app = Flask(__name__)

# cliente
@app.get('/')
def client():
    return render_template("index.html", api_str="api") # api_str indica a rota do servidor

# modificador usado para execução com exec 
def specialExec(code):
    execResult = ""
    # sobrecarrega a função print
    def print(value):
        nonlocal execResult
        execResult += "{}\n".format(value)
    exec(code)
    return execResult


# servidor
@app.post('/api')
def server():
    # por padrão, se o método não for 'POST', retorna um 405 Method Not Allowed
    response = ("", 405)

    if request.method == 'POST':
        # captura os dados do formulário enviados ao servidor
        code = request.form['code']
        doexec = request.form['exec']!="0"
        
        # evalua-se / executa-se o código (code), e retorna-o para o cliente
        try:
            if doexec: # se o usuário escolheu exec em vez de eval
                # executa o código com evprint em vez de print
                result = specialExec(code)
                # o que seria mostrado no print padrão é enviado ao cliente como texto
                response = (result, 200)
            else:
                result = eval(code)
                response = ("{}".format(result), 200)
        except Exception as error:
            # se houver problema ao rodar o eval, retorna ao cliente um 400 Bad Request
            response = ("{}".format(error), 400)
    # a resposta é uma dupla (texto do body, status http)
    return response

if __name__ == '__main__':
    app.run()

// adiciona [tab] e [enter] especiais ao editor do código "code"
document.getElementById('codigo').addEventListener('keydown', function (event) {
    // [ctrl + apagar] é usado em vez de Tab para manter a acessibilidade com o [tab]
    if ((event.ctrlKey && event.key==='Backspace') || event.key==='Enter') {
        event.preventDefault();

        // divide o texto digitado pela posição do foco (cursor/caret) atual
        let code = this.value, beforeCursor = this.selectionStart, afterCursor = this.selectionEnd;
        let codeBC = code.substring(0, beforeCursor), codeAC = code.substring(afterCursor);
        // espaçamento especial a ser adicionado
        let newSpace = '';
        
        if (event.key==='Backspace') {
            newSpace = '\t';
        }
        // dependendo do que está digitado, adiciona uma nova linha especial ao apertar [enter]
        else {
            // adiciona nova linha tabulada "\n\t" após dois-pontos ":"
            if (codeBC.endsWith(':')) { newSpace = '\n\t'; }
            // após outra coisa qualquer, adiciona nova linha normal
            else { newSpace = '\n'; }

            // além disso, mantém a tabulação da linha atual para a próxima

            let tabs = '';
            // procura a última linha antes do cursor (ou seja, a linha atual)
            let lineStart = (codeBC+"").lastIndexOf('\n');
            // se não há nova linha, tudo antes do cursor é a primeira linha
            if (lineStart===-1) { lineStart = 0; }
            // regex para encontrar as tabulações da linha atual
            let tabMatch = (codeBC+"").substring(lineStart+1).match(/^\t+/gm)
            if (tabMatch!==null) { tabs = tabMatch[0]; }
            // adiciona as tabulações encontradas (ou nada, se não existirem)
            newSpace += tabs; addToCursor = 1+(tabs.length); 
        }

        // finalmente, adiciona o espaçamento e reposiciona o cursor

        this.value = codeBC+newSpace+codeAC;
        this.selectionStart = this.selectionEnd = beforeCursor+(newSpace.length);
        return false;
    }
})
/* Infelizmente há uma observação: Essa modificação programática quebra o Desfazer (ctrl-Z) do texto da textarea */
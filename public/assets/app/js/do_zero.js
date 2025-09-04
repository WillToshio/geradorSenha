// password-generator.js - Gerador principal de senhas
$(document).ready(function () {
    const $inputNumber = $("#caracter-input");
    const $inputRange = $("#caracter-range");
    const $checkboxes = $('input[type="checkbox"]');
    const $senhaGerada = $("#senhaGerada");
    
    // Configuração inicial
    const initialConfig = {
        value: 8,
        min: 6,
        max: 64,
        defaultChecks: ['#uppercase', '#lowercase', '#number']
    };

    // Inicializar valores
    $inputNumber.val(initialConfig.value).attr({
        min: initialConfig.min,
        max: initialConfig.max
    });
    $inputRange.val(initialConfig.value).attr({
        min: initialConfig.min,
        max: initialConfig.max
    });

    // Marcar checkboxes padrão
    initialConfig.defaultChecks.forEach(selector => {
        $(selector).prop('checked', true);
    });

    // Sincronizar inputs
    const syncInputs = (source, target) => {
        let value = Math.max(initialConfig.min, Math.min(initialConfig.max, parseInt(source.val()) || initialConfig.value));
        source.val(value);
        target.val(value);
    };

    $inputNumber.on("input", () => {
        syncInputs($inputNumber, $inputRange);
        gerarSenha();
    });

    $inputRange.on("input", () => {
        syncInputs($inputRange, $inputNumber);
        gerarSenha();
    });

    // Character sets
    const characterSets = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        number: "0123456789",
        symbols: "!@#$%^&*()_-+=<>?/{}[]|"
    };

    // Garantir que pelo menos um checkbox esteja selecionado
    const validateCheckboxes = () => {
        const checkedCount = $checkboxes.filter(':checked').length;
        
        if (checkedCount === 0) {
            initialConfig.defaultChecks.forEach(selector => {
                $(selector).prop('checked', true);
            });
        }
    };

    // Monitorar checkboxes
    $checkboxes.on("change", function() {
        validateCheckboxes();
        gerarSenha();
    });

    // Função para avaliar força da senha
    function avaliarSenha(senha) {
        if (!senha) return 0;
        
        let nivel = 0;

        if (senha.length >= 6) nivel++;
        if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) nivel++;
        if (/\d/.test(senha)) nivel++;
        if (/[^a-zA-Z0-9]/.test(senha)) nivel++;
        if (senha.length >= 12) nivel++;

        return Math.min(nivel, 5);
    }

    // Função para atualizar visualização da força
    function atualizarForca(senha) {
        let nivel = avaliarSenha(senha);

        let cores = ["#ff0000", "#ff4000", "#ff8000", "#ffbf00", "#80ff00", "#00cc00"];
        let textos = [
            "Muito Fraca",
            "Fraca",
            "Média",
            "Boa",
            "Forte",
            "Excelente"
        ];

        $("#barraForca").css({
            width: (nivel * 20) + "%",
            background: cores[nivel]
        });

        $("#textoForca").text(textos[nivel]);
    }

    // Função para gerar senha
    function gerarSenha() {
        // Se houver texto no senhaBase, não gerar automaticamente
        if ($("#senhaBase").val().length > 0) {
            return;
        }

        const tamanho = parseInt($inputNumber.val()) || initialConfig.value;
        const selectedSets = {};
        let allCharacters = "";

        // Coletar conjuntos selecionados
        $checkboxes.each(function() {
            const id = this.id;
            if (this.checked && characterSets[id]) {
                selectedSets[id] = characterSets[id];
                allCharacters += characterSets[id];
            }
        });

        if (allCharacters.length === 0) {
            $senhaGerada.val("Selecione pelo menos uma opção");
            atualizarForca("");
            return;
        }

        let senha = "";
        const selectedKeys = Object.keys(selectedSets);
        
        selectedKeys.forEach(key => {
            const randomChar = selectedSets[key].charAt(Math.floor(Math.random() * selectedSets[key].length));
            senha += randomChar;
        });

        const remainingLength = tamanho - senha.length;
        for (let i = 0; i < remainingLength; i++) {
            senha += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
        }

        senha = shuffleString(senha);
        $senhaGerada.val(senha);
        atualizarForca(senha);
    }

    // Função para embaralhar string
    function shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    // Ouvir evento de senha alterada (disparado pelo LeetSpeak)
    $(document).on('senhaAlterada', function(event, senha) {
        atualizarForca(senha);
    });

    // Atualizar força enquanto o usuário edita manualmente
    $senhaGerada.on("input", function () {
        atualizarForca($(this).val());
    });

    // Inicializar
    validateCheckboxes();
    gerarSenha();
});
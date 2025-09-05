if (typeof window.debounce === 'undefined') {
    window.debounce = function(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    };
}
// leetspeak.js - Função inteligente para conversão LeetSpeak com segurança
class LeetSpeak {
    constructor() {
        // Mapa com substituições classificadas por segurança (mais seguro primeiro)
        this.leetMap = {
            'a': ['4', '@', '/\\', '^', 'A'],
            'b': ['8', '6', '|3', 'B', '13'],
            'c': ['(', '<', '{', 'C', '['],
            'd': ['|)', 'D', '|]'],
            'e': ['3', 'E', '€', '&'],
            'f': ['|=', 'F', 'ph'],
            'g': ['6', '9', 'G', '&'],
            'h': ['#', 'H', '|-|', '}{'],
            'i': ['1', 'I', '!', '|'],
            'j': ['_|', 'J', '_/'],
            'k': ['|<', 'K', '|{'],
            'l': ['1', 'L', '|_', '|'],
            'm': ['|\\/|', 'M', '/\\/\\'],
            'n': ['|\\|', 'N', '/\\/'],
            'o': ['0', 'O', '()', '[]'],
            'p': ['|*', 'P', '|o'],
            'q': ['9', 'Q', '0_'],
            'r': ['|2', 'R', '|?'],
            's': ['5', 'S', '$'],
            't': ['7', 'T', '+'],
            'u': ['|_|', 'U', '(_)'],
            'v': ['\\/', 'V'],
            'w': ['\\/\\/', 'W', 'vv'],
            'x': ['><', 'X', '}{'],
            'y': ['`/', 'Y'],
            'z': ['2', 'Z'],
            'A': ['4', '@', '/\\', '^', 'a'],
            'B': ['8', '6', '|3', 'b', '13'],
            'C': ['(', '<', '{', 'c', '['],
            'D': ['|)', 'd', '|]'],
            'E': ['3', 'e', '€', '&'],
            'F': ['|=', 'f', 'ph'],
            'G': ['6', '9', 'g', '&'],
            'H': ['#', 'h', '|-|', '}{'],
            'I': ['1', 'i', '!', '|'],
            'J': ['_|', 'j', '_/'],
            'K': ['|<', 'k', '|{'],
            'L': ['1', 'l', '|_', '|'],
            'M': ['|\\/|', 'm', '/\\/\\'],
            'N': ['|\\|', 'n', '/\\/'],
            'O': ['0', 'o', '()', '[]'],
            'P': ['|*', 'p', '|o'],
            'Q': ['9', 'q', '0_'],
            'R': ['|2', 'r', '|?'],
            'S': ['5', 's', '$'],
            'T': ['7', 't', '+'],
            'U': ['|_|', 'u', '(_)'],
            'V': ['\\/', 'v'],
            'W': ['\\/\\/', 'w', 'vv'],
            'X': ['><', 'x', '}{'],
            'Y': ['`/', 'y'],
            'Z': ['2', 'z'],
            '0': ['O', '()'],
            '1': ['I', 'l', '!'],
            '2': ['Z', 'R'],
            '3': ['E'],
            '4': ['A'],
            '5': ['S', '$'],
            '6': ['b', 'G'],
            '7': ['T', 'L'],
            '8': ['B', '&'],
            '9': ['g', 'q']
        };

        // Pontuação de segurança para cada tipo de caractere
        this.securityScores = {
            'lowercase': 1,
            'uppercase': 2,
            'number': 1,
            'symbol': 3,    // Símbolos são mais seguros
            'complex': 4    // Substituições complexas são as mais seguras
        };
    }

    // Classificar substituições por segurança
    classificarSubstituicoesPorSeguranca() {
        for (const char in this.leetMap) {
            this.leetMap[char].sort((a, b) => {
                return this.getSecurityScore(b) - this.getSecurityScore(a);
            });
        }
    }

    // Obter pontuação de segurança para uma substituição
    getSecurityScore(substituicao) {
        if (substituicao.length > 1) return this.securityScores.complex;
        if (/[0-9]/.test(substituicao)) return this.securityScores.number;
        if (/[a-z]/.test(substituicao)) return this.securityScores.lowercase;
        if (/[A-Z]/.test(substituicao)) return this.securityScores.uppercase;
        if (/[^a-zA-Z0-9]/.test(substituicao)) return this.securityScores.symbol;
        return 0;
    }

    aplicarLeetSpeak(texto, intensidade = 3, ativo = true) {
        if (!texto || !ativo) return texto;
        
        intensidade = Math.min(5, Math.max(1, intensidade));
        let resultado = '';

        for (let char of texto) {
            if (this.leetMap[char] && Math.random() < (intensidade * 0.15)) {
                const substituicoes = this.leetMap[char];
                
                // Intensidade 1-2: substituições mais seguras (símbolos)
                // Intensidade 3-4: mistura
                // Intensidade 5: substituições mais visuais (às vezes menos seguras)
                let index;
                
                if (intensidade <= 2) {
                    // Baixa intensidade: prioriza segurança (primeiras da lista ordenada)
                    index = Math.floor(Math.random() * Math.min(2, substituicoes.length));
                } else if (intensidade <= 4) {
                    // Média intensidade: aleatório balanceado
                    index = Math.floor(Math.random() * substituicoes.length);
                } else {
                    // Alta intensidade: prioriza visual (últimas da lista)
                    index = Math.max(0, substituicoes.length - 1 - Math.floor(Math.random() * 2));
                }
                
                resultado += substituicoes[index];
            } else {
                resultado += char;
            }
        }

        return resultado;
    }

    // Calcular força estimada do LeetSpeak
    estimarForcaLeet(texto, intensidade) {
        if (!texto) return 0;
        
        let score = 0;
        let substituicoes = 0;

        for (let char of texto) {
            if (this.leetMap[char] && Math.random() < (intensidade * 0.15)) {
                substituicoes++;
                // Bônus por substituição, mas não exagera
                score += 0.5;
            }
        }

        // Muitas substituições podem tornar a senha muito previsível
        const taxaSubstituicao = substituicoes / texto.length;
        if (taxaSubstituicao > 0.7) score -= 1; // Penaliza excesso
        if (taxaSubstituicao > 0.9) score -= 2; // Penaliza muito excesso

        return Math.max(0, score);
    }

    // Inicializar monitoramento com controle inteligente
    iniciarMonitoramento() {
        const $senhaBase = $("#senhaBase");
        const $senhaGerada = $("#senhaGerada");
        const $leetToggle = $("#leet-toggle");
        const $leetIntensity = $("#leet-intensity");
        const $forcaInfo = $("#forca-leet-info");

        // Classificar substituições por segurança
        this.classificarSubstituicoesPorSeguranca();

        if ($senhaBase.length && $senhaGerada.length) {
            const processarLeet = () => {
                const textoBase = $senhaBase.val();
                const intensidade = parseInt($leetIntensity.val()) || 3;
                const ativo = $leetToggle.is(':checked');
                
                const senhaLeet = this.aplicarLeetSpeak(textoBase, intensidade, ativo);
                $senhaGerada.val(senhaLeet);
                
                // Atualizar informação de força do Leet
                if ($forcaInfo.length) {
                    const forcaLeet = this.estimarForcaLeet(textoBase, intensidade);
                    const dicas = [
                        "💡 Dica: Use intensidade 3-4 para melhor segurança",
                        "💡 Muitas substituições podem reduzir a segurança",
                        "💡 Combine LeetSpeak com outros caracteres",
                        "💡 Intensidade moderada geralmente é mais segura"
                    ];
                    
                    $forcaInfo.html(`
                        <small>Força Leet: ${'⭐'.repeat(Math.round(forcaLeet))}</small>
                        <br>
                        <small>${dicas[Math.floor(Math.random() * dicas.length)]}</small>
                    `);
                }
                
                $(document).trigger('senhaAlterada', [senhaLeet]);
            };

            $senhaBase.on("input", processarLeet);

            // Monitorar com debounce para melhor performance
            $leetToggle.add($leetIntensity).on("change input", 
                window.debounce(processarLeet, 100)
            );

            // Tooltip educativo para intensidade
            $leetIntensity.on('mousemove', window.debounce(() => {
                const intensidade = parseInt($leetIntensity.val());
                const dica = this.getDicaIntensidade(intensidade);
                $leetIntensity.attr('title', dica);
            }, 200));

            console.log("LeetSpeak inteligente iniciado");
        }
    }

    getDicaIntensidade(intensidade) {
        const dicas = {
            1: "Poucas substituições - Baixa segurança",
            2: "Algumas substituições - Segurança moderada",
            3: "Balanceado - Boa segurança visual",
            4: "Muitas substituições - Pode reduzir segurança",
            5: "Máximo - Mais visual, menos seguro"
        };
        return dicas[intensidade] || "Ajuste a intensidade";
    }
}



$(document).ready(function() {
    window.leetSpeak = new LeetSpeak();
    window.leetSpeak.iniciarMonitoramento();
});
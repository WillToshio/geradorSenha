// leetspeak.js - Função independente para conversão LeetSpeak
class LeetSpeak {
    constructor() {
        this.leetMap = {
            'a': ['4', '@', '/\\', '^', '∂', 'A'],
            'b': ['8', '6', '|3', '13', ']3', 'B'],
            'c': ['(', '<', '{', '[', '©', 'C'],
            'd': ['|)', '|]', 'Ð', '∂', '])', 'D'],
            'e': ['3', '€', '&', '£', 'ë'],
            'f': ['|=', 'ph', 'ƒ', '|*', 'v'],
            'g': ['6', '9', '&', 'C-', '(_+'],
            'h': ['#', '|-|', '}{', ']-[', ':-:'],
            'i': ['1', '!', '|', '][', 'ï'],
            'j': ['_|', '_/', ']', '</', '(/)'],
            'k': ['|<', '|{', ']{', '|(', '|;'],
            'l': ['1', '|_', '|', '£', '][_'],
            'm': ['|\\/|', '/\\/\\', '|V|', ']\\/[', '(T)'],
            'n': ['|\\|', '/\\/', 'И', '^/', '|\\\\|'],
            'o': ['0', '()', '[]', 'Ω', 'ø'],
            'p': ['|*', '|o', '|7', '|>', '|"'],
            'q': ['9', '0_', '(,)', '<|', '¶'],
            'r': ['|2', '|?', '|^', 'lz', '®'],
            's': ['5', '$', 'z', '§', 'esh'],
            't': ['7', '+', '-|-', "'|'", '†'],
            'u': ['|_|', '(_)', 'μ', 'v', 'L|'],
            'v': ['\\/', '|/', '\\\\//', '√', '▼'],
            'w': ['\\/\\/', 'vv', '\\N', "'//", '\\X/'],
            'x': ['><', '}{', ')(', '×', '‡'],
            'y': ['`/', '¥', '\\|/', 'φ', 'Ч'],
            'z': ['2', '7_', '~/_', '%', '≥'],
            '0': ['O', '()', '∅', 'º', '°'],
            '1': ['I', '|', 'l', '!', 'ɪ'],
            '2': ['Z', 'R', '²', 'ƻ', 'ᒿ'],
            '3': ['E', 'Ɛ', '³', '£', 'ǝ'],
            '4': ['A', '∀', '¶', 'ᔭ', '⊥'],
            '5': ['S', '$', '§', '5', 'ϛ'],
            '6': ['b', 'G', '9', 'Ϭ', 'б'],
            '7': ['T', 'L', '7', '⌊', 'Г'],
            '8': ['B', '∞', '&', '8', 'Ө'],
            '9': ['g', 'q', '6', '9', 'ҩ']
        };
    }

    aplicarLeetSpeak(texto, intensidade = 3, ativo = true) {
        if (!texto || !ativo) return texto;
        
        intensidade = Math.min(5, Math.max(1, intensidade));
        let resultado = '';

        for (let char of texto) {
            const lowerChar = char.toLowerCase();
            
            if (this.leetMap[lowerChar] && Math.random() < (intensidade * 0.2)) {
                const substituicoes = this.leetMap[lowerChar];
                const nivel = Math.min(intensidade - 1, substituicoes.length - 1);
                resultado += substituicoes[nivel];
            } else {
                resultado += char;
            }
        }

        return resultado;
    }

    // Inicializar monitoramento do input#senhaBase
    iniciarMonitoramento() {
        const $senhaBase = $("#senhaBase");
        const $senhaGerada = $("#senhaGerada");
        const $leetToggle = $("#leet-toggle");
        const $leetIntensity = $("#leet-intensity");

        if ($senhaBase.length && $senhaGerada.length) {
            $senhaBase.on("input", () => {
                const textoBase = $senhaBase.val();
                const intensidade = parseInt($leetIntensity.val()) || 3;
                const ativo = $leetToggle.is(':checked');
                
                const senhaLeet = this.aplicarLeetSpeak(textoBase, intensidade, ativo);
                $senhaGerada.val(senhaLeet);
                
                // Disparar evento customizado para atualizar força da senha
                $(document).trigger('senhaAlterada', [senhaLeet]);
            });

            // Monitorar toggle e intensidade
            $leetToggle.add($leetIntensity).on("change input", () => {
                $senhaBase.trigger("input");
            });
        }
    }
}

// Inicializar automaticamente quando o DOM estiver pronto
$(document).ready(function() {
    window.leetSpeak = new LeetSpeak();
    window.leetSpeak.iniciarMonitoramento();
});
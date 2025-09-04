<div class="container">

    <form action="post" class="form-control d-grid">
        <div class="row">
            <div class="mb-3 col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <label for="senhaGerada" class="form-label">Senha gerada</label>
                <input type="text" name="senhaGerada" id="senhaGerada" class="form-control">
                <div id="forcaContainer" style="margin-top:10px;">
                    <div id="barraForca" style="
                        width: 0%; 
                        height: 15px; 
                        border-radius: 8px; 
                        transition: width 0.3s, background 0.3s;">
                    </div>
                    <small id="textoForca"></small>
                </div>
            </div>
        </div>
        <div class="row mx-auto">
            <div class="row text-start">
                <h3>Gere sua senha</h3>
            </div>
            <div class="row">
                <div class="col-12 col-sm-8 col-md-8 mb-3">
                    <label for="caracter" class="form-label">Num. caracteres da senha</label>
                    <div class="row">
                        <div class="col-3 col-sm-4">
                            <input type="number" class="form-control form-control-sm" name="caracter-input"  min="6" max="64" step="1" id="caracter-input">
                        </div>
                        <div class="col-9 col-sm-8">
                            <input type="range" class="form-range" name="caracter" min="6" max="64" step="1" id="caracter-range">
                        </div>
                    </div>                   
                </div>
                <div class="col-12 col-sm-4 mb-3">
                    <div class="row row-cols-2 row-cols-sm-1 g-2">
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="uppercase" checked>
                                <label class="form-check-label" for="uppercase">
                                    Letras maiúscula
                                </label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lowercase" checked>
                                <label class="form-check-label" for="lowercase">
                                    Letras minúscula
                                </label>
                            </div> 
                        </div>
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="number">
                                <label class="form-check-label" for="number">
                                    Números
                                </label>
                            </div>  
                        </div>
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="symbols">
                                <label class="form-check-label" for="symbols">
                                    Símbolos
                                </label>
                            </div>   
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        
    </form>
</div>

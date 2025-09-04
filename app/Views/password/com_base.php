<div class="container">

    <form action="post" class="form-control d-grid">
        <div class="row">
             <div class="mb-3 col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <label for="senhaBase" class="form-label">Digite seu texto base:</label>
                <input type="text" name="senhaBase" id="senhaBase" class="form-control">
            </div>
            <div class="mb-3 col-12 col-sm-12 col md-10 col-lg-8 col-xl-6 mx-auto row-2 row-md-1">
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="leet-toggle" checked>
                        <label class="form-check-label" for="leet-toggle">
                            controlar intensidade
                        </label>
                    </div>
                </div>
                
                <div class="col-9 col-sm-8">
                    <input type="range" class="form-range" name="leet-intensity" id="leet-intensity" min="1" max="5" value="3">
                </div>
            </div>
            <div class="mb-3 col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <label for="senhaGerada" class="form-label">Senha gerada</label>
                <input type="text" name="senhaGerada" id="senhaGerada" class="form-control" readonly>
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
    </form>
</div>
        
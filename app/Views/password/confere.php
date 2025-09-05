<div class="container">

    <form action="post" class="form-control d-grid">
        <div class="row">
            <div class="mb-3 col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <label for="senhaGerada" class="form-label">Digite sua senha para verificar a segurança</label>
                <input type="password" name="senhaGerada" id="senhaGerada" class="form-control">
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

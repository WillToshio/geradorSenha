<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Generate password</title>
	<meta name="description" content="The small framework with powerful features">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="shortcut icon" type="image/png" href="<?= base_url() ?>/favicon.ico"/>
    
    <link rel="stylesheet" href="<?= base_url() ?>/assets/vendors/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    <link rel="stylesheet" href="<?= base_url() ?>/assets/app/css/header.css" />
    <link rel="stylesheet" href="<?= base_url() ?>/assets/app/css/sidebar.css" />
    <link rel="stylesheet" href="<?= base_url() ?>/assets/app/css/theme-light.css" />
    <link rel="stylesheet" href="<?= base_url() ?>/assets/app/css/toolbar.css" />
    <link rel="stylesheet" href="<?= base_url() ?>/assets/app/css/form.css" />
    <link rel="stylesheet" href="<?= base_url() ?>/assets/app/css/grid.css" />
    <link rel="stylesheet" href="<?= base_url() ?>/assets/app/css/modal.css" />
    <link rel="stylesheet" href="<?= base_url() ?>/assets/app/css/app.css" />

</head>
<body lang="pt-BR">
    <div class="page-wrapper <?= $app->setting['appTheme']?>">
        <header class="w-100">
            <nav class="navbar navbar-expand-lg <?= $app->setting['appTheme']?>">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Criador de senha</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav justify-content-start">
                            <li class="nav-item">
                                <a class="nav-link btn btn-sm btn-outline-primary me-2" aria-current="page" href="from_zero">do zero</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn btn-sm btn-outline-primary me-2" href="pass_check">conferir segurança</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn btn-sm btn-outline-primary me-2" href="from_base">de uma base</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn btn-sm btn-outline-primary me-2" href="incluse">tendo que conter</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn btn-sm btn-outline-primary" href="game">Jogo</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <div class="sidebar-item sidebar-menu">
                </div>
            </div>
        </nav>
        <main class="page-content mt-5">
            <div class="message-panel fixed-top">
                <div class="message-content"></div>
            </div>
            <div id="overlay" class="overlay"></div>
            <div id="overlay-header" class="overlay-header"></div>

            <div class="container-fluid " id="app-main-container">
                <div class="row">

                    <div class="lmask-panel">
                        <div class="lmask-content">
                            <div class="btn btn-sm btn-warning lmask collapse">
                                <div class="icon-spinner spinner-grow" role="status"></div>
                                <strong><?= lang('app.Loading...') ?></strong>
                            </div>
                        </div>
                    </div>

                    <?= $this->include($contentTemplatePath) ?>
                </div>
            </div>
        </main>

    </div>
    <script src="<?= base_url() ?>/assets/vendors/jquery/jquery-3.6.0.min.js"></script>
    <script src="<?= base_url() ?>/assets/vendors/jquery/jquery.tmpl.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.1/umd/popper.min.js" integrity="sha512-g2PN+aYR0KupTVwea5Ppqw4bxWLLypWdd+h7E0ydT8zF+/Y2Qpk8Y1SnzVw6ZCVJPrgB/91s3VfhVhP7Y4+ucw==" crossorigin="anonymous"></script>
    <script src="<?= base_url() ?>/assets/vendors/bootstrap/js/bootstrap.min.js"></script>

    <script src="<?= base_url() ?>/assets/app/js/do_zero.js"></script>
    <script src="<?= base_url() ?>/assets/app/js/leetspeak.js"></script>
</body>
</html>
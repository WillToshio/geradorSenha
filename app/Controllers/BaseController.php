<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;


class BaseController extends Controller
{
    /**
     * An array of helpers to be loaded automatically upon class instantiation.
     *
     * @var array
     */
    protected $helpers = ['mask', 'date', 'view', 'store', 'response', 'email', 'permission', 'util'];

    protected $pageTitle = '';
    protected $viewportPath = '';
    protected $data = [];

    /**
     * Constructor.
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @param LoggerInterface   $logger
     */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        parent::initController($request, $response, $logger);

        $this->setCurrentController();

        if ($this->controller === 'auth' && $this->method === 'signin') {
            return;
        }

        $this->session = \Config\Services::session();
    }

    protected function setCurrentController()
    {
        $router = \Config\Services::router();
        $this->controller = strtolower(substr($router->controllerName(), 17));
        $this->method = $router->methodName();
    }

    protected function setPageTitle($pageTitle)
    {
        $this->pageTitle = $pageTitle ;
    }

    protected function setViewport($viewportFile = false)
    {
        if (!$viewportFile)
        {
            $viewportFile = 'viewport/auth';
        }
        $this->viewportPath = $viewportFile;
    }

    protected function template($contentTemplateName, $data = false)
    {
        $view = \Config\Services::renderer();

        $view->setVar('app', $this->getAppData());
        $view->setVar('pageTitle', $this->pageTitle);
        $view->setVar('contentTemplatePath', $contentTemplateName);

        if ($data) {
            $view->setData($data);
        }

        echo $view->render($this->viewportPath);
    }

    protected function getAppData()
    {
        $appTheme = $this->session->appTheme ?? 'light-theme';
        $sidebarInit = $this->session->sidebarInit ?? 'init-pinned';

        return (object) array(
            'baseUrl'  => base_url(),
            'language' => service('request')->getLocale(),
            'tmp'      => [],
            'setting' => [
                'appTheme'           => $appTheme,
                'sidebarInit'        => $sidebarInit,
                'recordsPerPage'     => 20,
                'skipConfirmDelete'  => true,
                'skipConfirmRestore' => true,
                'skipConfirmPurge'   => false,
            ],
            'request'  => array(
                'controller' => $this->controller ?? '',
                'action'     => $this->method ?? '',
            ),
        );
    }
}

<?php

namespace App\Controllers;

class Home extends BasePublicController
{
    public function __construct()
    {
        parent::initController(\Config\Services::request(), \Config\Services::response(), \Config\Services::logger());
        $this->setViewport('viewport/index');
    }
    public function index()
    {
        $this->template('password/index');
    }
    public function do_zero(){

        $this->template('password/do_zero');
    }
    public function com_base(){
        
        $this->template('password/com_base');
    }
    public function incluindo(){
        
        $this->template('password/incluindo');
    }
    public function jogo(){
        
        $this->template('password/jogo');
    }
}

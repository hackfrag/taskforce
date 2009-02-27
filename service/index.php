<?php
set_include_path('.' . PATH_SEPARATOR . 'library' . PATH_SEPARATOR . 'application/models'  . PATH_SEPARATOR .   get_include_path());
require_once 'Zend/Loader.php';

Zend_Loader::registerAutoload();

error_reporting(E_ALL|E_NOTICE);

$config = new Zend_Config(require 'config/config.php');



$db = Zend_Db::factory($config->database);
Zend_Db_Table_Abstract::setDefaultAdapter($db);



$frontController = Zend_Controller_Front::getInstance();
$frontController->throwExceptions(true);
$frontController->setDefaultControllerName('sync');
$frontController->setControllerDirectory('application/controllers');


$frontController->dispatch();

?>
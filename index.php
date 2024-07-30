<?php

$return = [];

$return['_SERVER'] = $_SERVER;
$uri = $return['uri'] = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

var_dump($_SERVER);
// echo PHP_EOL;
// var_dump($uri);
// echo PHP_EOL;
// var_dump(explode("/", $uri));
// echo PHP_EOL;
// var_dump(PHP_URL_PATH);
// var_dump($uri);
$exp_uri = $return['uri'] = explode("/", $uri);
// var_dump($exp_uri);
if (($uri !== '/' && $uri !== '/index.php') && sizeof($exp_uri) > 3) {
    // var_dump($_SERVER['SCRIPT_FILENAME']);
    // var_dump($_SERVER['PATH_TRANSLATED']);
    // var_dump(dirname($_SERVER['SCRIPT_FILENAME']));
    // $language = $exp_uri[1];
    // $dir = $exp_uri[1];
    // var_dump($language);
    $language = $exp_uri[1];
    // var_dump($language);
    // require_once __DIR__ . '/' . $language . '/index.php';
    if (sizeof($exp_uri) == 3) {

        require_once __DIR__ . '/' . $language . '/index.php';
    } else if (sizeof($exp_uri) > 3) {
        $framework = $exp_uri[2];
        require_once __DIR__ . '/' . $language . '/' . $framework . '/index.php';
    }
} else {
    getfiles(dirname($_SERVER['SCRIPT_FILENAME']));
}
// if (($uri !== '/' && $uri !== '/index.php') && file_exists(__DIR__ . '/public' . $uri)) {
//     return false;
// }

// require_once __DIR__ . '/public/index.php';
function getfiles($path)
{
    foreach (scandir($path) as $afile) {
        if ($afile == '.' || $afile == '..' || $afile == 'vendor' || $afile[0] == '.' || $afile[0] == '_')
            continue;
        if (is_dir($path . '/' . $afile)) {
            echo '<a href="' . $_SERVER['REQUEST_URI'] . $afile . '">' . $path . '/' . $afile . '</a><br />';
            // getfiles($path . '/' . $afile);
        } else {
            // echo $path . '/' . $afile . '<br />';
        }
    }
} //简单的demo,列出当前目录下所有的文件
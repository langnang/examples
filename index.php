<?php

$return = [];

$return['_SERVER'] = $_SERVER;
$uri = $return['uri'] = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

// var_dump($_SERVER);
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
    return;
}
// if (($uri !== '/' && $uri !== '/index.php') && file_exists(__DIR__ . '/public' . $uri)) {
//     return false;
// }

// require_once __DIR__ . '/public/index.php';
function getfiles($path, $method)
{
    foreach (scandir($path) as $afile) {
        if ($afile == '.' || $afile == '..' || $afile == 'vendor' || $afile[0] == '.' || $afile[0] == '_')
            continue;
        if (is_dir($path . '/' . $afile)) {
            $method($afile, $path);
            // echo '<a href="' . $_SERVER['REQUEST_URI'] . $afile . '">' . $path . '/' . $afile . '</a><br />';
            // getfiles($path . '/' . $afile);
        } else {
            // echo $path . '/' . $afile . '<br />';
        }
    }
} //简单的demo,列出当前目录下所有的文件


?>

<!doctype html>
<html lang="zh-CN">

<head>
    <!-- 必须的 meta 标签 -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap 的 CSS 文件 -->
    <link rel="stylesheet" crossorigin="anonymous" href="https://unpkg.com/normalize.css@8.0.1/normalize.css">
    <link rel="stylesheet" crossorigin="anonymous" href="https://unpkg.com/animate.css@4.1.1/animate.min.css">
    <link rel="stylesheet" crossorigin="anonymous" href="https://unpkg.com/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <title>Examples</title>

    <style>
        .card-img-top {
            width: 100% !important;
        }
    </style>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Examples</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto d-none">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">Dropdown</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0 d-none">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
        <div class="jumbotron" style="padding:2rem;">
            <div class="container">
                <h1 class="display-4">范例（Examples）</h1>
                <p class="lead">范例（Examples），一般指代可以仿效的事例；典范的例子。</p>
            </div>

        </div>
    </header>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="list-group">
                    <a href="<?php echo dirname($_SERVER['REQUEST_URI']); ?>" class="list-group-item list-group-item-action py-2" aria-current="true">
                        ...
                    </a>

                    <?php getfiles(dirname($_SERVER['SCRIPT_FILENAME']), function ($file, $path) {
                        if (in_array($file, ['assets']))
                            return;
                        echo '<a href="' . $_SERVER['REQUEST_URI'] . $file . '" class="list-group-item list-group-item-action py-2">' . $path . '/' . $file . '</a>';
                    }); ?>
                </div>
            </div>
        </div>

    </div>

    <!-- JavaScript 文件是可选的。从以下两种建议中选择一个即可！ -->

    <!-- 选项 1：jQuery 和 Bootstrap 集成包（集成了 Popper） -->
    <script crossorigin="anonymous" src="https://unpkg.com/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script crossorigin="anonymous" src="https://unpkg.com/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <script crossorigin="anonymous" src="https://unpkg.com/mockjs@1.1.0/dist/mock-min.js"></script>
    <!-- 选项 2：Popper 和 Bootstrap 的 JS 插件各自独立 -->
    <!--
    <script src="https://unpkg.com/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-Lge2E2XotzMiwH69/MXB72yLpwyENMiOKX8zS8Qo7LDCvaBIWGL+GlRQEKIpYR04" crossorigin="anonymous"></script>
    -->

    <script crossorigin="anonymous" src="https://unpkg.com/holderjs@2.9.9/holder.min.js"></script>
    <!-- <script crossorigin="anonymous" src="https://www.unpkg.com/holderjs@2.9.9/holder.js"></script> -->
</body>

</html>
<?php

// getfiles(__DIR__);
function copyFolder($src, $dest)
{
    // 如果目标目录不存在，则创建目标目录
    if (!is_dir($dest)) {
        mkdir($dest);
    }
    // 获取原始目录中的文件和目录
    $files = scandir($src);
    // 遍历文件和目录
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            // 如果该文件是一个目录，则递归调用该函数复制子目录
            if (is_dir($src . DIRECTORY_SEPARATOR . $file)) {
                copyFolder($src . DIRECTORY_SEPARATOR . $file, $dest . DIRECTORY_SEPARATOR . $file);
            } else {
                // 如果该文件是一个文件，则复制文件到目标目录中
                copy($src . DIRECTORY_SEPARATOR . $file, $dest . DIRECTORY_SEPARATOR . $file);
            }
        }
    }
}
function deleteFolder($folderPath)
{
    $files = scandir($folderPath);
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            $filePath = $folderPath . '/' . $file;
            if (is_dir($filePath)) {
                deleteFolder($filePath);
            } else {
                unlink($filePath);
            }
        }
    }
    rmdir($folderPath);
}
function getfiles($path, $callback)
{
    foreach (scandir($path) as $afile) {
        if ($afile == '.' || $afile == '..' || $afile == 'vendor' || $afile[0] == '.' || $afile[0] == '_')
            continue;
        if (is_dir($path . '/' . $afile)) {
            if (file_exists($path . '/' . $afile . '/' . $afile)) {

                // var_dump($afile);
                copyFolder($path . '/' . $afile . '/' . $afile, $path . '/' . $afile);

                deleteFolder($path . '/' . $afile . '/' . $afile);
            }
            $callback($afile, $path);
            // echo '<a href="' . $_SERVER['REQUEST_URI'] . $afile . '">' . $path . '/' . $afile . '</a><br />';
            // getfiles($path . '/' . $afile);
        } else {
            // echo $path . '/' . $afile . '<br />';
        }
    }
}


?>
<!doctype html>
<html lang="zh-CN">

<head>
    <!-- 必须的 meta 标签 -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap 的 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

    <title>Examples</title>

    <style>
        .card-img-top {
            /* width: 100% !important; */
            height: 181px;
        }
    </style>
</head>

<body>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <a class="navbar-brand" href="#">HTML Examples</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="./preview.php">Preview</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li>
                    <li class="nav-item dropdown disabled">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-expanded="false">Dropdown</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav">
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
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </header>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-3">
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                        Preview
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">A second link item</a>
                    <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                    <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
                    <a class="list-group-item list-group-item-action disabled">A disabled link item</a>
                    <?php
                    getfiles(__DIR__, function ($afile, $path) {
                        $html = '<a href="#" class="list-group-item list-group-item-action" data-href="./' . $afile . '/dist" onclick="e=>handlerClickGroupItem(e)">' . $afile . '</a>';
                        echo $html;
                    });
                    ?>
                </div>
            </aside>
            <main class="col-9">
                <iframe style="width: 100%;height: calc(100vh - 80px);" src="./bootstrap-3-carousel-new-control-positions/dist/" frameborder="0"></iframe>
                <div class="row row-cols-3">
                    <?php

                    getfiles(__DIR__, function ($afile, $path) {
                        $html = '<div class="col p-2">
                <a class="card" href="./' . $afile . '/dist">';
                        if (file_exists($afile . '/screenshot.png')) {
                            $html .= '<img src="./' . $afile . '/screenshot.png" class="card-img-top" alt="...">';
                            return false;
                        } else if (file_exists($afile . '/dist/index.html')) {
                            // $html .= '<iframe src="./' . $afile . '/dist" ></iframe>';
                            $html .= '<img src="holder.js/362x181" class="card-img-top" alt="...">';
                        }
                        echo $html . '
                    <div class="card-body">
                        <h5 class="card-title">' . $afile . '</h5>
                        <p class="card-text">The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.</p>
                    </div>
                </a>
            </div>';

                    });
                    ?>

                </div>
            </main>
        </div>

    </div>

    <!-- JavaScript 文件是可选的。从以下两种建议中选择一个即可！ -->

    <!-- 选项 1：jQuery 和 Bootstrap 集成包（集成了 Popper） -->
    <!-- <script src="./../assets/lib/jquery/3.7.1/jquery.min.js"></script> -->
    <!-- <script src="https://unpkg.com/jquery@3.5.1/dist/jquery.slim.min.js"></script> -->
    <!-- <script src="./../assets/lib/bootstrap/4.6.2/js/bootstrap.min.js"></script> -->
    <!-- <script src="https://unpkg.com/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script> -->

    <!-- 选项 2：Popper 和 Bootstrap 的 JS 插件各自独立 -->
    <!--
    <script src="https://unpkg.com/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"></script>
    <script src="https://unpkg.com/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"></script>
    <script src="https://unpkg.com/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-Lge2E2XotzMiwH69/MXB72yLpwyENMiOKX8zS8Qo7LDCvaBIWGL+GlRQEKIpYR04"></script>
    -->

    <script src="https://cdn.jsdelivr.net/npm/holderjs@2.9.9/holder.min.js"></script>
    <!-- <script src="https://www.unpkg.com/holderjs@2.9.9/holder.js"></script> -->

    <script>
        function handlerClickGroupItem(e) {
            console.log(`handlerClickGroupItem`, e, this)
        }
    </script>
</body>

</html>
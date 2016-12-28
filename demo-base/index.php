<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="/src/bootstrap-3.3.0-dist/css/bootstrap.min.css">
<link rel="stylesheet" href="/src/bootstrap-3.3.0-dist/css/bootstrap-theme.min.css">
<script src="/src/jquery.min.js"></script>
<script src="/src/bootstrap-3.3.0-dist/js/bootstrap.min.js"></script>
<!-- easy-bootstrap -->
<script type="text/javascript" src="/easy-bootstrap/easy-bootstrap.js?v=<?=time()?>"></script>
<script type="text/javascript" src="/easy-bootstrap/searchbox.easy-bootstrap.js?v=<?=time()?>"></script>
<title>Demo</title>
</head>
<body>

<div class="container" style="width:800px;margin-top:auto;">
    <!-- searchbox -->
    <div class="demo-item">
        <h1>searchbox</h1>
        <input name="city" id="searchbox" value="">
    </div>
    <div class="demo-item">
        <h1>input-group</h1>
        <div class="input-group" style="width:120px;">
            <input type="text" class="form-control">
            <span class="input-group-btn">
                <a class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></a>
            </span>
        </div>
        </div>
    </div>
</div>

<script type="text/javascript">
// searchbox
var jq_searchbox = $('#searchbox');
jq_searchbox.searchbox({
    width: 120,
    prompt: '搜索',
    size: 'sm',
    searcher: function() {
        alert(arguments[0]);
    }
});
</script>

</body>
</html>
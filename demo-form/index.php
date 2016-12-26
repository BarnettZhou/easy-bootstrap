<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="/src/bootstrap-3.3.0-dist/css/bootstrap.min.css">
<link rel="stylesheet" href="/src/bootstrap-3.3.0-dist/css/bootstrap-theme.min.css">
<script src="/src/jquery.min.js"></script>
<script src="/src/bootstrap-3.3.0-dist/js/bootstrap.min.js"></script>
<!-- easy-bootstrap -->
<script type="text/javascript" src="/combobox.easy-bootstrap.js?v=<?=time()?>"></script>
<title>Demo</title>
</head>
<body>

<div class="container" style="width:800px;margin-top:auto;">
    <!-- combobox -->
    <div class="demo-item">
        <h1>combobox</h1>
        <input name="city" id="combobox" value="">
    </div>
</div>

<script type="text/javascript">
// combobox
var jq_combobox = $('#combobox');
jq_combobox.combobox({
    width: 'full',
    btnSize: 'default',
    valueField: 'id',
    textField: 'name',
    onSelect: function(record) {console.log(record)},
    data: [
        {
            id: 100,
            name: '全部',
            selected: true,
        },
        {
            id: 1,
            name: '01',
        },
        {
            id: 2,
            name: '02',
        }
    ],
});
</script>

</body>
</html>
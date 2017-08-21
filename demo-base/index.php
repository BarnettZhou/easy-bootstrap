<?php require_once '../lib/Demo.php';?>
<?php showHeader();?>

<div class="container" style="width:800px;margin-top:auto;">
    <!-- searchbox -->
    <div class="demo-item">
        <h1>searchbox - 搜索框</h1>
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

    <div class="demo-item">
        <h1>progressbar - 进度条</h1>
        <div id="progressbar"></div>
    </div>
    <div class="demo-item">
        <h1>progress</h1>
        <div class="progress" style="width:200px;">
            <div class="progress-bar" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="100" style="width: 2%;min-width: 20px;">
            2%
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

// progressbar
var jq_progressbar = $('#progressbar');
jq_progressbar.progressbar({
    width: 300,
    value: 70,
    onChange: function() {
        console.log(arguments);
    }
})
</script>

<?php showFooter(); ?>
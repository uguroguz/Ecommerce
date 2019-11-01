$(document).ready(function(){
    //page->produuct_detail.pug
    $('.add-chart').on('click',function(e){
        $target = $(e.target);
        var product = $target.attr('data-id');
        var amount = $('input[name = amount]').val();
        $.ajax({
            type:'POST',
            url: '/chart/add',
            data:{
                product:product,
                amount:amount
            },
            success: function(){
                location.reload();                
            },
            error: function(err){
                console.log(err);
            }
        });
    });
    
    //page->chart.pug
    /*$('.remove-from-chart').on('click', function(e){
        $target = $(e.target);
        var product = $target.attr(data-id);
        $.ajax({
            type:'POST',
            url:'/chart/remove',
        });
    });*/

});
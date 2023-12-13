$(document).ready(function () {

    let inputArr = $("input");

    inputArr.on("focusout", function (e) {
        console.log(e.target.id);
        console.log($(`#${e.target.id}`))
        if (e.target.value) {
            $(`#${e.target.id}`).css('border', '2px solid #760c22');
            $(`#${e.target.id}check`).hide();
        } else {
            $(`#${e.target.id}`).css('border', '2px solid red');
            $(`#${e.target.id}check`).show();
        }
    });

    $('#choosecheck').hide();
    $('#namecheck').hide();
    $('#telcheck').hide();

    let loader = $('.loader');

    $("#submitbtn").click(function (e) {
        e.preventDefault();

        let order = $('#choose');
        let name = $('#name');
        let tel = $('#tel');
        let hasError = false;

        if(!order.val()) {
            hasError = true;
            order.css('border', '2px solid red');
            $(`#choosecheck`).show();
        }

        if(!name.val()) {
            hasError = true;
            name.css('border', '2px solid red');
            $(`#namecheck`).show();

        }
        if(!tel.val()) {
            hasError = true;
            tel.css('border', '2px solid red');
            $(`#telcheck`).show();
        }

        if(hasError){
            return;
        }

        loader.css('display', 'flex');

        if(!hasError) {
            $.ajax({
                method: "POST",
                url: "http://testologia.site/checkout",
                data: { product: order.val(), name: name.val(), phone: tel.val() }
            })
                .done(function (msg) {
                    loader.hide();
                    console.log(msg);
                    if(msg.success) {
                        $('#form').remove()
                        $('.gratitude').css('display', 'flex')
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                    }
                });
        }

    })

})
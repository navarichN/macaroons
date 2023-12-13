$(document).ready(function () {

    document.getElementById("main__action").onclick = function () {
        document.getElementById("choice").scrollIntoView({behavior: "smooth"});
    }

    let links = document.querySelectorAll('.menu__link');
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            document.getElementById(links[i].getAttribute('data-link')).scrollIntoView({behavior: "smooth"});
        }
    }

    let buttons = document.getElementsByClassName('choice__item-button');
    let products = document.getElementsByClassName('choice__item');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function (e) {
            document.getElementById("choose").value = products[i].children[1].innerText;
            document.getElementById("order").scrollIntoView({behavior: "smooth"});
        }
    }

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
                        alert('An error occurred while placing the order, please call us to place your order.')
                    }
                });
        }

    })

})
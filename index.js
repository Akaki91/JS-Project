$(function() {

    // fetch('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(err => {
    //         console.log(err);
            
    //     })

    var sum = 0
    var totalRow = 0
    var checkRow = 0

    function renderTr(obj) {
        let item = []
        item.push("<td><input type='checkbox' class='check'></>");
        item.push("<td>" + obj.creditorName + "</td>");
        item.push("<td>" + obj.firstName + "</td>");
        item.push("<td>" + obj.lastName + "</td>");
        item.push("<td style='text-align: right'>" + obj.minPaymentPercentage + ".00% </td>");
        item.push("<td style='text-align: right'>" + obj.balance + ".00 </td>");

        $("<tr/>", { html: item.join("") }).appendTo(".mainTable")
    }

    
    $.getJSON("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json",  (data) => {
        
        let i = 0 
        while (i < data.length) {
            renderTr(data[i])

            
            i++
        }
        totalRow += data.length
        rowCount(totalRow)
    });


    var clickCount = 0
    $('#add').on('click', () => {
        if (clickCount % 2 === 0) {
        let item = []
        
        item.push("<td></>")
        item.push("<td><input class='textfield' type='text' name='creditorName' placeholder='creditorName' ></>")
        item.push("<td><input class='textfield' type='text' name='firstName' placeholder='firstName'></>")
        item.push("<td><input class='textfield' type='text' name='lastName' placeholder='lastName'></>")
        item.push("<td><input class='textfield' type='text' name='minPaymentPercentage' placeholder='minPaymentPercentage'></>")
        item.push("<td><input class='textfield' type='text' name='balance' placeholder='balance'></>")


        $("<tr/>", { html: item.join("") }).addClass('inputText').appendTo(".mainTable")
        
        clickCount++
    }
    

    else  {
    
        let obj = {}

        $('.textfield').each((i, element) => {
            obj[$(element).attr('name')] = $(element).val()
        })

        $('.inputText').remove()
        renderTr(obj)   

        totalRow ++
        rowCount(totalRow)

        
        clickCount++
        } 
    })
        
                  

    $('#remove').on('click', () => {
        totalRow -= $(".check:checked").length
        rowCount(totalRow)
        $(".check:checked").parent().parent().remove()
    })
    

    $('#markAll').on('change', () => {

        if ($('#markAll').prop("checked") === true) {
            $(".check").prop("checked", true)
        }
        else {
            $(".check").prop("checked", false)
        }
        
    })



    function rowCount(num) {
        $('#rowCount').children().last().remove()
        $(`<div>${num}</div>`).appendTo('#rowCount')
    }


    function checkCount(num) {
        $('#checkCount').children().last().remove()
        $(`<div>${num}</div>`).appendTo('#checkCount')
    }


    // $(".check").prop("checked").length
    // checkCount(checkRow)

    // checkCount(checkRow)
    

console.log($(".check"));


    // $("input:checkbox").each((i, el) => {
    //     console.log('hi');
        
    //     $(el).on('change', () => {
    //         console.log($(el));
 

    //     })
    // })
    
    

    

    function total() {
        $(".check:checked").parent().parent().last().each( (i, element)=>{

            sum += element.val()
            console.log(sum);
        })
        
        
    }



})
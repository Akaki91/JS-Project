$(function() {

    // Fetching Elements. We could use both of this methods either with jQuery or Fetch API

    // $.getJSON("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json",  (data) => {
    // });


    fetch('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
        .then(res => res.json())
        .then(data => {
            let i = 0
            while (i < data.length) {
                renderTr(data[i])

                i++
            }

            addCheckListen()
        })
        .catch(err => {
            console.log(err);
            
    })


    // Defining variables

    var sum = 0
    var totalRow = 0
    var checkRow = 0


    // To render tableraws. This is used for initial fetch method as well as when new item is added to the table

    function renderTr(obj) {
        let item = []
        item.push("<td><input type='checkbox' class='check'></>");
        item.push("<td>" + obj.creditorName + "</td>");
        item.push("<td>" + obj.firstName + "</td>");
        item.push("<td>" + obj.lastName + "</td>");
        item.push("<td style='text-align: right'>" + obj.minPaymentPercentage + ".00% </td>");
        item.push("<td style='text-align: right'>" + obj.balance + ".00 </td>");

        $("<tr/>", { html: item.join("") }).appendTo(".mainTable")

        totalRow++
        rowCount(totalRow)
        
    }


    // toggling clicks on add button. First click adds input areas. Second click adds filled input area values to the table

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
    
    // when new item is added to the table we re-render the table
    // listener is also added to checkbox input dinamicly

    else  {
    
        let obj = {}

        $('.textfield').each((i, element) => {
            obj[$(element).attr('name')] = $(element).val()
        })

        $('.inputText').remove()
        renderTr(obj) 

        clickCount++
        } 

        addCheckListen()
        
    })
    
                  
// Looking for checked checkboxes and removing its row in the table
// Decrementing total row count by checked element number

    $('#remove').on('click', () => {
        totalRow -= $(".check:checked").length
        rowCount(totalRow)
        $(".check:checked").parent().parent().remove()
    })
    

// checking all the checkboxes 
// re rendering checked boxes count and summing all the values for total sum


    $('#markAll').on('change', () => {

        if ($('#markAll').prop("checked") === true) {
            $(".check").prop("checked", true)
            checkRow = totalRow
            checkCount(checkRow)


            $(".check").each((i, el) => {
                sum += Number($(el).parent().parent().children().last().text())
            })
            total(sum)

        }

// unchecking all checkboxes and re rendering checked boxes count and sum to 0
        else {
            $(".check").prop("checked", false)
            checkRow = 0
            checkCount(checkRow)

            sum = 0
            total(0)
        }
        
    })


// adding change listeners to checkboxes dynamicly while rendering the table 
// in order to avoid two change listeners previous listener is unbinded to all emenets
// check row count is incremented and sum is increased by the added element value


    function addCheckListen() {
        $(".check").unbind()
        $(".check").each((i, el) => {
            $(el).on('change', () => {
                if ($(el).prop("checked") === true) {
                    checkRow++
                    checkCount(checkRow);
                    
                    sum += Number($(el).parent().parent().children().last().text()) 
                    total(sum)
                }

// decrementing checkrow and sum by removed item value
                else {
                    checkRow--
                    checkCount(checkRow);

                    sum -= Number($(el).parent().parent().children().last().text()) 
                    total(sum)
                }
            })
        })

    }

// helper functions to render page and its elements of total row count checked checkboxs count and total sum

    function rowCount(num) {
        $('#rowCount').children().last().remove()
        $(`<div>${num}</div>`).appendTo('#rowCount')
    }

    function checkCount(num) {
        $('#checkCount').children().last().remove()
        $(`<div>${num}</div>`).appendTo('#checkCount')
    }
    
    function total(num) {
        $('.totalWrapper').children().last().remove()
        $(`<div>$${num}</div>`).appendTo('.totalWrapper')
    }




})
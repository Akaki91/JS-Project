$(function () {
    // Fetching Elements. We could use both of this methods either with jQuery or Fetch API

    // $.getJSON("",  (data) => {
    // });

    fetch("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json")
        .then(res => res.json())
        .then(data => {
            let i = 0;
            while (i < data.length) {
                // rendering each element of the table one by one
                renderTr(data[i]);
                
                i++;
            }
        })
        .catch(err => {
            console.log(err);
        });

    // Defining variables which then will modify total sum, total count of rows and total checked rows

    var sum = 0;
    var totalRow = 0;
    var checkedRow = 0;

    // Rendering tablerows. This is used during initial fetch method 
    // when new item is added to the table

    function renderTr(obj) {
        let item = [];
        item.push("<td><input type='checkbox' class='check'></>");
        item.push("<td class='bckground'>" + obj.creditorName + "</td>");
        item.push("<td class='bckground'>" + obj.firstName + "</td>");
        item.push("<td class='bckground'>" + obj.lastName + "</td>");
        item.push("<td class='bckground' style='text-align: right'>" + obj.minPaymentPercentage + ".00% </td>");
        item.push("<td class='bckground' style='text-align: right'>" + obj.balance + ".00 </td>");

        $("<tr/>", { html: item.join("") }).appendTo(".mainTable");

        totalRow++;
        rowCount(totalRow);
    }

    // toggling clicks on add button. First click adds input areas. Second click adds filled input area values to the table

    var clickCount = 0;
    $("#add").on("click", () => {
        if (clickCount % 2 === 0) {
            let item = [];

            item.push("<td></>");
            item.push("<td><input class='textfield' type='text' name='creditorName' placeholder='Creditor Name' ></>");
            item.push("<td><input class='textfield' type='text' name='firstName' placeholder='First Name'></>");
            item.push("<td><input class='textfield' type='text' name='lastName' placeholder='Last Name'></>");
            item.push("<td><input class='textfield' type='text' name='minPaymentPercentage' placeholder='Min Payment Percentage'></>");
            item.push("<td><input class='textfield' type='text' name='balance' placeholder='Balance'></>");

            $("<tr/>", { html: item.join("") }).addClass("inputText").appendTo(".mainTable");

            clickCount++;
        }

        // on second click new item is added to the table. and re-rendering the table
        else {
            let obj = {};

            $(".textfield").each((i, element) => {
                obj[$(element).attr("name")] = $(element).val();
            });

            $(".inputText").remove();
            renderTr(obj);

            $("#markAll").prop("checked", false)
            clickCount++;
        }
    });

    // Looking for checked checkboxes and removing its row in the table
    // Decrementing total row count by checked element number

    $("#remove").on("click", () => {
        totalRow -= $(".check:checked").length;
        rowCount(totalRow);
        $(".check:checked").closest('tr').remove();

        // re rendering checked boxes count and total sum
        checkedRow = 0;
        checkCount(checkedRow);

        sum = 0;
        total(0);
    });

    // checking all the checkboxes
    // re rendering checked boxes count and summing all the values for total sum

    $("#markAll").on("change", () => {
        if ($("#markAll").prop("checked")) {
            $(".check").prop("checked", true);

            // removing background color after selecting
            $(".check:checked").closest('tr').children().removeClass('bckground')

            checkedRow = totalRow;
            checkCount(checkedRow);


            sum = 0;
            $(".check").each((i, el) => {
                sum += Number(
                    $(el).closest('tr').children().last().text()
                );
            });
            total(sum);
        }

        // unchecking all checkboxes and re rendering checked boxes count and sum to 0
        else {
            $(".check").prop("checked", false);

            // adding background color after de-selecting
            $(".check").closest('tr').each((i, el) => {
                $(el).children().not(':first').addClass('bckground')
            })

            checkedRow = 0;
            checkCount(checkedRow);

            sum = 0;
            total(0);
        }
    });

    // adding change listeners to checkboxes parent element and listening rendered checkbox elemnts
    // check row count is incremented and sum is increased by the added element value

    $(".mainTable").on("change", ".check", function () {
        if ($(this).prop("checked")) {

            $(this).closest('tr').children().not(':first').removeClass('bckground')

            checkedRow++;
            checkCount(checkedRow);

            sum += Number(
                $(this).closest('tr').children().last().text()
            );
            total(sum);
        }

        // decrementing checkedRow count and sum by removed item value
        else {

            $(this).closest('tr').children().not(':first').addClass('bckground')

            checkedRow--;
            checkCount(checkedRow);

            sum -= Number(
                $(this).closest('tr').children().last().text()
            );
            total(sum);
            $("#markAll").prop("checked", false);
        }

        if ($(".check:checked").length == $(".check").length) {
            $("#markAll").prop("checked", true);
        }
    });

    // helper functions to render table elements of total row count, checked checkboxs count, and total sum

    function rowCount(num) {
        $("#rowCount").children().last().remove();
        $(`<div>${num}</div>`).appendTo("#rowCount");
    }

    function checkCount(num) {
        $("#checkCount").children().last().remove();
        $(`<div>${num}</div>`).appendTo("#checkCount");
    }

    function total(num) {
        $(".totalWrapper").children().last().remove();
        $(`<div>$${num.toLocaleString()}.00</div>`).appendTo(".totalWrapper");
    }
});

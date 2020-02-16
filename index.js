$(function () {
    // Fetching Elements. We could use both of this methods either with jQuery or Fetch API

    // $.getJSON("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json",  (data) => {
    // });

    fetch("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json")
        .then(res => res.json())
        .then(data => {
            let i = 0;
            while (i < data.length) {
                // rendering each element of the table
                renderTr(data[i]);

                i++;
            }
        })
        .catch(err => {
            console.log(err);
        });

    // Defining variables

    var sum = 0;
    var totalRow = 0;
    var checkRow = 0;

    // To render tableraws. This is used for initial fetch method as well as when new item is added to the table

    function renderTr(obj) {
        let item = [];
        item.push("<td><input type='checkbox' class='check'></>");
        item.push("<td>" + obj.creditorName + "</td>");
        item.push("<td>" + obj.firstName + "</td>");
        item.push("<td>" + obj.lastName + "</td>");
        item.push("<td style='text-align: right'>" + obj.minPaymentPercentage + ".00% </td>");
        item.push("<td style='text-align: right'>" + obj.balance + ".00 </td>");

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

        // when new item is added to the table we re-render the table
        else {
            let obj = {};

            $(".textfield").each((i, element) => {
                obj[$(element).attr("name")] = $(element).val();
            });

            $(".inputText").remove();
            renderTr(obj);

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
        checkRow = 0;
        checkCount(checkRow);

        sum = 0;
        total(0);
    });

    // checking all the checkboxes
    // re rendering checked boxes count and summing all the values for total sum

    $("#markAll").on("change", () => {
        if ($("#markAll").prop("checked") === true) {
            $(".check").prop("checked", true);
            checkRow = totalRow;
            checkCount(checkRow);

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
            checkRow = 0;
            checkCount(checkRow);

            sum = 0;
            total(0);
        }
    });

    // adding change listeners to checkboxes parent element and listening rendered checkbox elemnts
    // check row count is incremented and sum is increased by the added element value

    $(".mainTable").on("change", ".check", function () {
        if ($(this).prop("checked") === true) {
            checkRow++;
            checkCount(checkRow);

            sum += Number(
                $(this).closest('tr').children().last().text()
            );
            total(sum);
        }

        // decrementing checkrow count and sum by removed item value
        else {
            checkRow--;
            checkCount(checkRow);

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

    // helper functions to render page and its elements of total row count, checked checkboxs count, and total sum

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
        $(`<div>$${num}.00</div>`).appendTo(".totalWrapper");
    }
});

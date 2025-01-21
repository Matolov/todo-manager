const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

$(document).ready(function () {
    displayItems();

    $('#enter').click(function (event) {
        event.preventDefault();  
        const item = $('#item').val();
        if (item) {
            createItem(item);
            $('#item').val(""); 
        }
    });

    function createItem(item) {
        itemsArray.push(item);
        localStorage.setItem("items", JSON.stringify(itemsArray));
        displayItems();  
    }

    function displayItems() {
        let items = "";
        itemsArray.forEach((item, i) => {
            items += `
                <div class="item">
                    <div class="input-controller">
                        <textarea disabled>${item}</textarea>
                        <div class="edit-controller">
                            <i class='bx bxs-edit-alt editBtn'></i>
                            <i class='bx bx-check deleteBtn'></i>
                        </div>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`;
        });
        $(".todo-list").html(items);
        activateListeners();
    }

    function activateListeners() {
        $(".deleteBtn").click(function () {
            const index = $(this).closest('.item').index();
            deleteItem(index);
        });

        $(".editBtn").click(function () {
            const index = $(this).closest('.item').index();
            const updateController = $(".update-controller").eq(index);
            const textarea = $(".input-controller textarea").eq(index);
            updateController.show();
            textarea.prop("disabled", false);
        });

        $(".saveBtn").click(function () {
            const index = $(this).closest('.item').index();
            const newText = $(".input-controller textarea").eq(index).val();
            updateItem(newText, index);
        });

        $(".cancelBtn").click(function () {
            const index = $(this).closest('.item').index();
            const updateController = $(".update-controller").eq(index);
            const textarea = $(".input-controller textarea").eq(index);
            updateController.hide();
            textarea.prop("disabled", true);
        });
    }

    function updateItem(text, i) {
        itemsArray[i] = text;
        localStorage.setItem("items", JSON.stringify(itemsArray));
        displayItems();
    }

    function deleteItem(i) {
        itemsArray.splice(i, 1);
        localStorage.setItem("items", JSON.stringify(itemsArray));
        displayItems();
    }
});

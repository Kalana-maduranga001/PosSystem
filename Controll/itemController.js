import {customers, items} from "/db/db.js";

import { ItemModel } from "/Model/ItemModel.js";

let selectedIndex =  -1;

function resetItemForm() {
    $('#item, #qty, #price, #description').val('');
    selectedIndex = -1;
}

function renderItems() {
   const tbody = $('#tbody-item');
   tbody.empty();
   items.forEach((itm, index) => {

       tbody.append(`
          <tr>
             <td>${index + 1}</td>
             <td>${itm.item}</td>
             <td>${itm.qty}</td>
             <td>${itm.price}</td>
             <td>${itm.description}</td>
          </tr>
           
       `);
   });

}

$("#tbody-item").on('click', 'tr', function () {
    let index = $(this).index();
    let item = items[index];
    selectedIndex = index;

    $('#item').val(item.item);
    $('#qty').val(item.qty);
    $('#price').val(item.price);
    $('#description').val(item.description);

});

$("#item_save").on('click', ()=>{
    const item = $('#item').val();
    const qty = $('#qty').val();
    const price = $('#price').val();
    const description = $('#description').val();

    if(!item || !qty || !price || !description){
        Swal.fire('Validation Error', 'Something go wrong Insert All data about items.', 'warning');
        return
    }

    const itm = new ItemModel(item, qty, price, description);
    items.push(itm);

    swal.fire({
        title: "Saved!",
        text: "item Saved Successfully!",
        icon: "success"
    });
    renderItems();
    resetItemForm();
});

$("#item_update").on('click', ()=>{

    if (selectedIndex === -1) {
        Swal.fire('No Selection', 'Please select a item to update.', 'info');
        return;
    }

    const item = $('#item').val();
    const qty = $('#qty').val();
    const price = $('#price').val();
    const description = $('#description').val();

    const updateItem = new ItemModel(item, qty, price, description);
    items[selectedIndex] = updateItem;

    swal.fire({
        title: "Updated!",
        text: "item Updated Successfully!",
        icon: "success"
    });
    renderItems();
    resetItemForm();
});

$("#item_delete").on('click', ()=>{
    if (selectedIndex === -1) {
        Swal.fire('No Selection', 'Please select a item to Delete.', 'info');
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: 'This item will be removed!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    }).then(result => {
        if (result.isConfirmed) {
            items.splice(selectedIndex, 1);
            renderItems();
            resetItemForm();
        }
    });
});

$('#item_reset').on('click', resetItemForm);



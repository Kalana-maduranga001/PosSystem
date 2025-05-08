import {customers} from "/db/db.js";
import {CustomerModel} from "/Model/CustomerModel.js";

let selectedIndex = -1;

function resetCustomerForm() {
    $('#fname, #lname, #email, #phone, #address').val('');
    selectedIndex = -1;
}

//This defines a function called renderCustomers that will update the table with current customer data
function renderCustomers() {
    const tbody = $('#customer-tbody');
    tbody.empty();

    customers.forEach((cust, index) => {
        // Ensure proper escaping and avoid concatenation issues
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${cust.fname ?? ''}</td>
                <td>${cust.lname ?? ''}</td>
                <td>${cust.email ?? ''}</td>
                <td>${cust.phone ?? ''}</td>
                <td>${cust.address ?? ''}</td>
            </tr>
        `;
        tbody.append(row);
    });
}


$("#customer-tbody").on('click', 'tr', function () {
    let index = $(this).index();
    let customer = customers[index];
    selectedIndex = index;

    $('#fname').val(customer.fname);
    $('#lname').val(customer.lname);
    $('#email').val(customer.email);
    $('#phone').val(customer.phone);
    $('#address').val(customer.address);
});

function selectCustomer(index) {
    const cust = customers[index];
    $('#fname').val(cust.fname);
    $('#lname').val(cust.lname);
    $('#email').val(cust.email);
    $('#phone').val(cust.phone);
    $('#address').val(cust.address);
    selectedIndex = index;
}

$('#customer_save').on('click', () => {
    const fname = $('#fname').val();
    const lname = $('#lname').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const address = $('#address').val();

    if (!fname || !lname) {
        Swal.fire('Validation Error', 'First Name and Last Name are required.', 'warning');
        return;
    }

    const customer = new CustomerModel(fname, lname, email, phone, address);
    customers.push(customer);
    Swal.fire({
        title: "Saved!",
        text: "Customer Saved Successfully!",
        icon: "success"
    });
    renderCustomers();
    resetCustomerForm();
});

$('#customer_update').on('click', () => {
    if (selectedIndex === -1) {
        Swal.fire('No Selection', 'Please select a customer to update.', 'info');
        return;
    }

    const fname = $('#fname').val();
    const lname = $('#lname').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const address = $('#address').val();

    const updatedCustomer = new CustomerModel(fname, lname, email, phone, address);
    customers[selectedIndex] = updatedCustomer;
    Swal.fire({
        title: "Updated!",
        text: "Customer Updated Successfully!",
        icon: "success"
    });
    renderCustomers();
    resetCustomerForm();
});

$('#customer_delete').on('click', () => {
    if (selectedIndex === -1) {
        Swal.fire('No Selection', 'Please select a customer to delete.', 'info');
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: 'This customer will be removed!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    }).then(result => {
        if (result.isConfirmed) {
            customers.splice(selectedIndex, 1);
            renderCustomers();
            resetCustomerForm();
        }
    });
});

$('#customer_reset').on('click', resetCustomerForm);

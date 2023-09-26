import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders_without_crashing", () => {
    render(<App />);
  });

  it("adds_a_product_when_add_button_is_clicked", () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    const nameInput = getByPlaceholderText("Product Name");
    const descriptionInput = getByPlaceholderText("Product Description");
    const quantityInput = getByPlaceholderText("Quantity");
    const priceInput = getByPlaceholderText("Price");
    const addButton = getByText("Add");

    fireEvent.change(nameInput, { target: { value: "New Product" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.change(quantityInput, { target: { value: "10" } });
    fireEvent.change(priceInput, { target: { value: "19.99" } });

    fireEvent.click(addButton);

    const productName = getByText("New Product");
    const productDescription = getByText("New Description");
    const productQuantity = getByText("10");
    const productPrice = getByText("19.99");

    expect(productName).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productQuantity).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

describe("displaying the error message for the empty input fields",()=>{
   it("displays_an_error_message_when_adding_a_product_with_empty_fields", () => {
    const { getByText } = render(<App />);
    const addButton = getByText("Add");

    fireEvent.click(addButton);

    const errorMessage = getByText("All fields are required.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays_an_error_message_when_adding_a_product_with_an_empty_product_name", () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const addButton = getByText("Add");

    // Fill in other fields, leave 'Product Name' empty
    const descriptionInput = getByPlaceholderText("Product Description");
    const quantityInput = getByPlaceholderText("Quantity");
    const priceInput = getByPlaceholderText("Price");

    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.change(quantityInput, { target: { value: "10" } });
    fireEvent.change(priceInput, { target: { value: "19.99" } });

    fireEvent.click(addButton);

    const errorMessage = getByText("All fields are required.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays_an_error_message_when_adding_a_product_with_an_empty_product_description", () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const addButton = getByText("Add");

    // Fill in other fields, leave 'Product Description' empty
    const nameInput = getByPlaceholderText("Product Name");
    const quantityInput = getByPlaceholderText("Quantity");
    const priceInput = getByPlaceholderText("Price");

    fireEvent.change(nameInput, { target: { value: "New Product" } });
    fireEvent.change(quantityInput, { target: { value: "10" } });
    fireEvent.change(priceInput, { target: { value: "19.99" } });

    fireEvent.click(addButton);

    const errorMessage = getByText("All fields are required.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays_an_error_message_when_adding_a_product_with_an_empty_quantity", () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const addButton = getByText("Add");

    // Fill in other fields, leave 'Quantity' empty
    const nameInput = getByPlaceholderText("Product Name");
    const descriptionInput = getByPlaceholderText("Product Description");
    const priceInput = getByPlaceholderText("Price");

    fireEvent.change(nameInput, { target: { value: "New Product" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.change(priceInput, { target: { value: "19.99" } });

    fireEvent.click(addButton);

    const errorMessage = getByText("All fields are required.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays_an_error_message_when_adding_a_product_with_an_empty_price", () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const addButton = getByText("Add");

    // Fill in other fields, leave 'Price' empty
    const nameInput = getByPlaceholderText("Product Name");
    const descriptionInput = getByPlaceholderText("Product Description");
    const quantityInput = getByPlaceholderText("Quantity");

    fireEvent.change(nameInput, { target: { value: "New Product" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.change(quantityInput, { target: { value: "10" } });

    fireEvent.click(addButton);

    const errorMessage = getByText("All fields are required.");
    expect(errorMessage).toBeInTheDocument();
  });
})

  it("edits_a_product_when_edit_button_is_clicked", () => {
    const { getAllByText, getByPlaceholderText, getByText } = render(<App />);

    // Add a product first
    const nameInput = getByPlaceholderText("Product Name");
    const descriptionInput = getByPlaceholderText("Product Description");
    const quantityInput = getByPlaceholderText("Quantity");
    const priceInput = getByPlaceholderText("Price");
    const addButton = getByText("Add");

    fireEvent.change(nameInput, { target: { value: "Original Product" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Original Description" },
    });
    fireEvent.change(quantityInput, { target: { value: "5" } });
    fireEvent.change(priceInput, { target: { value: "15.00" } });

    fireEvent.click(addButton);

    // Click the 'Edit' button for the first product in the list
    const editButtons = getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    const updatedNameInput = getByPlaceholderText("Product Name");
    const updatedDescriptionInput = getByPlaceholderText("Product Description");
    const updatedQuantityInput = getByPlaceholderText("Quantity");
    const updatedPriceInput = getByPlaceholderText("Price");
    const updateButton = getByText("Update");

    fireEvent.change(updatedNameInput, { target: { value: "Updated Product" } });
    fireEvent.change(updatedDescriptionInput, {
      target: { value: "Updated Description" },
    });
    fireEvent.change(updatedQuantityInput, { target: { value: "10" } });
    fireEvent.change(updatedPriceInput, { target: { value: "19.99" } });

    fireEvent.click(updateButton);

    const finalName = getByText("Updated Product");
    const finalDescription = getByText("Updated Description");
    const finalQuantity = getByText("10");
    const finalPrice = getByText("19.99");

    expect(finalName).toBeInTheDocument();
    expect(finalDescription).toBeInTheDocument();
    expect(finalQuantity).toBeInTheDocument();
    expect(finalPrice).toBeInTheDocument();
  });
  it("deletes_a_product_when_delete_button_is_clicked", () => {
    const { getByText, getByPlaceholderText, getAllByText, queryByText } = render(<App />);
  
    const nameInput = getByPlaceholderText("Product Name");
    const descriptionInput = getByPlaceholderText("Product Description");
    const quantityInput = getByPlaceholderText("Quantity");
    const priceInput = getByPlaceholderText("Price");
    const addButton = getByText("Add");
  
    fireEvent.change(nameInput, { target: { value: "Original Product" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Original Description" },
    });
    fireEvent.change(quantityInput, { target: { value: "5" } });
    fireEvent.change(priceInput, { target: { value: "15.00" } });
  
    fireEvent.click(addButton);
  
    // Now, click the 'Delete' button for the first product in the list
    const deleteButtons = getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
  
    // Check that the first product is no longer in the list
    const deletedProductName = queryByText("Original Product");
    expect(deletedProductName).not.toBeInTheDocument();
  });
  
});

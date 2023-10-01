import { render } from "@testing-library/jest-dom";
import { SidebarCartItem } from "./sidebar_cart-item";
import { PRODUCTS } from "../products";
import "../setupTests";

describe(SidebarCartItem, () => {
  it("SidebarCartItem displays correctly initial amount", () => {
    const { getByTestId } = render(<SidebarCartItem data={PRODUCTS[6]} />);
    const countValue = getByTestId("sidebar_cart-item").textContent;

    expect(countValue).toEqual(0);
  });
});

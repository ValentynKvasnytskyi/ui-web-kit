import OutsideClickListener from "../../src/utils/OutsideClickListener";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("OutsideClickListener", () => {
  let container: HTMLElement;
  let div1: HTMLElement, div2: HTMLElement;
  let callback1: () => void, callback2: () => void;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    div1 = document.createElement("div");
    div1.id = "div1";
    container.appendChild(div1);

    div2 = document.createElement("div");
    div2.id = "div2";
    container.appendChild(div2);

    callback1 = jest.fn();
    callback2 = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should call the callback when click is outside the element", async () => {
    new OutsideClickListener(div1, callback1);

    await user.click(document.body);

    // div2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(callback1).toHaveBeenCalled();
  });

  it("should not call the callback when click is inside the element", async () => {
    new OutsideClickListener(div1, callback1);

    await user.click(div1);

    expect(callback1).not.toHaveBeenCalled();
  });

  it("should handle multiple instances", async () => {
    new OutsideClickListener(div1, callback1);
    new OutsideClickListener(div2, callback2);

    await user.click(div1);

    expect(callback2).toHaveBeenCalled();
    expect(callback1).not.toHaveBeenCalled();

    await user.click(div2);
    expect(callback1).toHaveBeenCalled();
  });

  it("should remove listener when destroyed", async () => {
    const listener = new OutsideClickListener(div1, callback1);
    listener.destroy();

    await user.click(div2);

    expect(callback1).not.toHaveBeenCalled();
  });
});

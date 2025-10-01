import { html, fixture, expect } from '@open-wc/testing';
import "../crown-47.js";

describe("Crown47 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <crown-47
        title="title"
      ></crown-47>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

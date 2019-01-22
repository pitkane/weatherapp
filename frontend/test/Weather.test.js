import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Weather from "../Weather";

Enzyme.configure({ adapter: new Adapter() });

describe("Main Weather component", () => {
  test("Renders at all", () => {
    const wrapper = shallow(<Weather />);

    expect(wrapper.exists()).toBe(true);
  });
});

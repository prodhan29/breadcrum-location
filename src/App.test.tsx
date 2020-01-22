import React from 'react';
import ReactDOM from 'react-dom';
import App, { renameProperty } from './App';
import { mount } from 'enzyme';
import sampleData from "./sample-data";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  
  const wrapper = mount(<App />);
  expect(wrapper.length).toBe(1);
});

it('simulate select country', ()=>{

  const wrapper = mount(<App />);
  const searchApp = wrapper.find('Select') as any;
  
  expect(searchApp.length).toBe(1);

  const location = renameProperty(sampleData.locations.locationsHierarchy, "map", "children")

  /** Click on of the item from the list */
  searchApp.props().onChange({value: location});

  /** After click check if that item has added to the breadcrumb list */
  expect((wrapper.state() as any).breadcrumItems.length).toBe(2);
  wrapper.unmount();
});

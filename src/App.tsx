import React, { useState } from 'react';
import sampleData from './sample-data';
import './App.css';
import { State, TBreadcrumItem, ComponentProps, SearchValue } from './model/models';
import { Breadcrumb, BreadcrumbItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Select from 'react-select';
import { getOptionValue } from 'react-select/src/builtins';


const SearchApp = (props: ComponentProps) => {
  let options = props.childNodes!.map((b: TBreadcrumItem) => {
    return {
      label: b.name,
      value: b
    }
  });

  function getOp(ob: any): TBreadcrumItem {
    return props.childNodes!.filter((b: TBreadcrumItem) => b.name == ob.label)[0];
  }

  return (
    <div>
      <Select
        value={null}
        autoFocus
        menuIsOpen
        onChange={(e: any) => props.addBreadcrumItem(getOp(e))}
        options={options}
      />
    </div>
  );
}







let buttonDropdownStyle = {
  backgroundColor: '#e9ecef',
  color: 'black',
  border: '0px',
}

const Dropdown = (props: ComponentProps) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}  >
      <DropdownToggle caret style={buttonDropdownStyle}>{props.name}</DropdownToggle>
      <DropdownMenu style={{ width: '250px' }}>
        <div> Change option  <a href="#"> Country </a> </div>
        <SearchApp {...props} addBreadcrumItem={(item: TBreadcrumItem) => {toggle(); props.addBreadcrumItem(item) }} />
      </DropdownMenu>
    </ButtonDropdown>
  );
}



const initialState: State = {
  posts: [],
  breadcrumItems: [sampleData],
}

class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = initialState;
  }

  addBreadcrumItem = (position: number, item: TBreadcrumItem): void => {
    this.setState({
      ...this.state,
      breadcrumItems: [...this.state.breadcrumItems.splice(0, ++position), item]
    })
  }

  render() {
    return (
      <div className="App">
        <Breadcrumb>
          {
            this.state.breadcrumItems.map((item: TBreadcrumItem, index: number) => {
              return (
                <BreadcrumbItem key={index}>
                  <Dropdown
                    name={item.name}
                    childNodes={item.children}
                    addBreadcrumItem={(item: TBreadcrumItem) => this.addBreadcrumItem(index, item)} />
                </BreadcrumbItem>
              )
            })
          }
        </Breadcrumb>
      </div>
    );
  }
}

export default App;

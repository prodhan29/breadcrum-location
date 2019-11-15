import React, {useState} from 'react';
import sampleData from './sample-data';
import './App.css';
import {State, TBreadcrumItem, DropdownProps} from './model/models';
import { Breadcrumb, BreadcrumbItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


let buttonDropdownStyle =  {
  backgroundColor: '#e9ecef',
  color: 'black',
  border: '0px',
}


const Dropdown = (props: DropdownProps) => {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}  >
      <DropdownToggle caret style={buttonDropdownStyle}>{props.name}</DropdownToggle>
      <DropdownMenu > 
        {
          props.childNodes.map((item: TBreadcrumItem, index: number)=> {
            return(
              <DropdownItem key={index} onClick={()=>props.addBreadcrumItem(item)}> {item.name} </DropdownItem>
            );
          })
        }
      </DropdownMenu>
    </ButtonDropdown>
  );
}



const initialState: State = {
  posts: [],
  breadcrumItems: [sampleData]
}

class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = initialState;
  }

  addBreadcrumItem =(position: number, item: TBreadcrumItem): void => {
    this.setState({
      ...this.state,
      breadcrumItems: [...this.state.breadcrumItems.splice(0, ++position), item]
    })
  } 

  render() {
    return(
      <div className="App">
          <Breadcrumb>
          {
            this.state.breadcrumItems.map((item:TBreadcrumItem, index: number)=> {
              return(
                <BreadcrumbItem key={index}> 
                  <Dropdown 
                    name = {item.name} 
                    childNodes= {item.children}
                    addBreadcrumItem = {(item: TBreadcrumItem)=> this.addBreadcrumItem(index, item)}/> 
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

import React, {useState} from 'react';
import sampleData from './sample-data';
import './App.css';
import {State, TBreadcrumItem, ComponentProps, SearchValue} from './model/models';
import { Breadcrumb, BreadcrumbItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Select from 'react-select';
import { getOptionValue } from 'react-select/src/builtins';



const initiComponentProps = {
  name: '',
  childNodes: [],
  addBreadcrumItem: ()=>{}
}

const SearchApp =(props: ComponentProps) => {
  let options = props.childNodes!.map((b: TBreadcrumItem)=>{
    return {
      label: b.name,
      value: b
    }
  });

  function getOp(ob: any) {
    return props.childNodes!.filter((b: TBreadcrumItem)=> b.name == ob.label)[0];
  }

  let p: TBreadcrumItem;
  return (
    <Select
      value={null}
      autoFocus
      onChange={(e:any)=> console.log(getOp(e)) } 
      options={options}
    />
  );
}







let buttonDropdownStyle =  {
  backgroundColor: '#e9ecef',
  color: 'black',
  border: '0px',
}

const Dropdown = (props: ComponentProps = initiComponentProps) => {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}  >
      <DropdownToggle caret style={buttonDropdownStyle}>{props.name}</DropdownToggle>
      <DropdownMenu style={{width: '250px'}}> 
        {/* {
          props.childNodes.map((item: TBreadcrumItem, index: number)=> {
            return(
              <DropdownItem key={index} onClick={()=>props.addBreadcrumItem(item)}> {item.name} </DropdownItem>
            );
          })
        } */}
        <SearchApp {...props}/>
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

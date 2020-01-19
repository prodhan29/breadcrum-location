import React, { useState } from "react";
import sampleData from "./sample-data";
import "./App.css";
import {
	State,
	ComponentProps,
	Location,
} from "./model/models";
import {
	Breadcrumb,
	BreadcrumbItem,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
} from "reactstrap";
import Select from "react-select";

const SearchApp = (props: ComponentProps) => {
	let options = props.childNodes.map((b: Location) => {
		return {
			label: b.label,
			value: b
		};
	});

	return (
		<div>
			<Select
				value={null}
				autoFocus
				menuIsOpen
				onChange={(e: any) => props.addBreadcrumItem(e.value)}
				options={options}
			/>
		</div>
	);
};

let buttonDropdownStyle = {
	backgroundColor: "white",
	color: "#2297d6",
	border: "0px"
};

const Dropdown = (props: ComponentProps) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);

	return (
		<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle caret style={buttonDropdownStyle}>
				{props.name}
			</DropdownToggle>
			<DropdownMenu style={{ width: "250px" }}>
				<div style={{paddingLeft: "8px"}}> Change option </div>
				<SearchApp
					{...props}
					addBreadcrumItem={(item: any) => {
						toggle();
						props.addBreadcrumItem(item);
					}}
				/>
			</DropdownMenu>
		</ButtonDropdown>
	);
};

const renameProperty = (
	ob: any = {},
	oldKey: string = "",
	newKey: string = ""
) => {
	ob[newKey] = ob[oldKey];
	delete ob[oldKey];
	return ob;
};

const initialState: State = {
	posts: [],
	breadcrumItems: [
		renameProperty(sampleData.locations.locationsHierarchy, "map", "children")
	]
};

class App extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = initialState;
	}

	addBreadcrumItem = (position: number, item: Location): void => {
		this.setState({
			...this.state,
			breadcrumItems: [...this.state.breadcrumItems.splice(0, ++position), item]
		});
	};

	getChildren = (ob: Location) => {
		if (ob.children === undefined) return [];
		return Object.keys(ob.children).map((item: string, index: number) => {
			return ob.children![item];
		});
	};

	render() {
		return (
			<div className="App">
				<Breadcrumb className = 'custom-breadcrumb'>
					{this.state.breadcrumItems.map((item: Location, index: number) => {

						console.log('breadcrumb item', item);
						return (
							<BreadcrumbItem key={index}>
								<Dropdown
									name={item.label}
									childNodes={this.getChildren(item)}
									addBreadcrumItem={(item: Location) =>
										this.addBreadcrumItem(index, item)
									}
								/>
							</BreadcrumbItem>
						);
					})}
				</Breadcrumb>
			</div>
		);
	}
}

export default App;

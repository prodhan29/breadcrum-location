import React, { useState } from "react";
import sampleData from "./sample-data";
import "./App.css";
import {
	State,
	TBreadcrumItem,
	ComponentProps,
	SearchValue
} from "./model/models";
import {
	Breadcrumb,
	BreadcrumbItem,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";
import Select from "react-select";

const SearchApp = (props: any) => {
	let options = props.childNodes.map((b: any) => {
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
	backgroundColor: "#e9ecef",
	color: "black",
	border: "0px"
};

const Dropdown = (props: any) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);

	return (
		<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle caret style={buttonDropdownStyle}>
				{props.name}
			</DropdownToggle>
			<DropdownMenu style={{ width: "250px" }}>
				<div>
					{" "}
					Change option <a href="#"> Country </a>{" "}
				</div>
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

	addBreadcrumItem = (position: number, item: any): void => {
		this.setState({
			...this.state,
			breadcrumItems: [...this.state.breadcrumItems.splice(0, ++position), item]
		});
	};

	getChildren = (ob: any) => {
		if (ob.children === undefined) return [];
		return Object.keys(ob.children).map((item: any, index: number) => {
			return ob.children[item];
		});
	};

	render() {
		return (
			<div className="App">
				<Breadcrumb>
					{this.state.breadcrumItems.map((item: any, index: number) => {
						return (
							<BreadcrumbItem key={index}>
								<Dropdown
									name={item.label}
									childNodes={this.getChildren(item)}
									addBreadcrumItem={(item: any) =>
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

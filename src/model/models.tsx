export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface State {
  posts: Post[],
  breadcrumItems: any,
}

export interface Response {
  config: any
  data: Post[]
  headers: any
  request: any
  status: any
  statusText: any
}

export interface TBreadcrumItem {
  groupDropOptionId: number,
  groupDropFieldId: number,
  parentId: number,
  name: string,
  exportValue: string,
  showChildren: boolean,
  editMode: boolean,
  children: TBreadcrumItem[],
}

export interface TBreadcrumItem2 {
  [key: string]: {
    id: string,
    label: string,
    node: {
      locationId: string,
      name: string,
      parentLocation: any,
      tags: string[],
      voided: boolean,
    },
    children?: {
      [key: string]: TBreadcrumItem2
    }
  }
}

export interface ComponentProps {
  name?: string
  childNodes: any,
  addBreadcrumItem(item: TBreadcrumItem): any,
}

export interface SearchValue {
  [key: string]: string
}


/** A single node for location hierarchy */
export interface LocationNode {
  [key: string]: {
      id: string;
      label: string;
      node: {
          locationId: string;
          name: string;
          parentLocation?: {
              locationId: string;
              name: string;
              voided: boolean;
              parentLocation?: {
                  locationId: string;
                  name: string;
                  voided: boolean;
              };
          };
          tags: string[];
          voided: boolean;
      };
      children?: LocationNode;
  };
}

/** Interface for location object */
export interface LocationHierarchy {
  locationsHierarchy: {
      map: LocationNode;
  };
}
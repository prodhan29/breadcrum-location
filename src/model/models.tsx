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
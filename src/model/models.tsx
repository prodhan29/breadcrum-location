export interface Post{
    userId: number,
    id: number,
    title: string ,
    body: string
}

export interface State {
    posts: Post[],
    breadcrumItems: any
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
    children: TBreadcrumItem[]
}

export interface DropdownProps {
    name: string
    childNodes: TBreadcrumItem[],
    addBreadcrumItem(item: TBreadcrumItem): any 
}
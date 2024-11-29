interface MenuItem {
    id: number;
    name: string;
    url: string;
    depth: number;
    children: MenuItem[];
}
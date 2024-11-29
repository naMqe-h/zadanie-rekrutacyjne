interface MenuItem {
    id: string;
    name: string;
    url: string;
    depth: number;
    children: MenuItem[];
}
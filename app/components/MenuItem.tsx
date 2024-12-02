"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddMenuItems from "./AddMenuItems";
import EditItem from "./EditItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface MenuItemProps {
    item: MenuItem;
    index: number;
    setMenuItems: (menuItems: MenuItem[]) => void;
    getMenuItems: () => MenuItem[];
}

export default function MenuItem({ item, index, setMenuItems, getMenuItems }: MenuItemProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: item.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };

    const handleDelete = () => {
        const menuItems = getMenuItems();
        const removeItem = (items: MenuItem[]): MenuItem[] => 
            items.filter((menuItem) => {
                if (menuItem.id === item.id) return false;
                if (menuItem.children.length > 0) {
                    menuItem.children = removeItem(menuItem.children);
                }
                return true;
            });
        
        setMenuItems(removeItem(menuItems));
    }

    const handleEdit = () => {
        setIsEditing(true);
        setIsAdding(false);
    };

    const handleAdd = () => {
        setIsAdding(true);
        setIsEditing(false);
    };

    const containerWidth = 1168 - (item.depth * 64);
    const marginLeft = `${item.depth * 64}px`;
    const isFirstItem = index === 0;
    const hasChildren = item.children.length > 0;

    return (
        <div 
            ref={setNodeRef}
            className={`w-[${containerWidth}px] h-auto ${isFirstItem ? "rounded-t-lg" : ""} flex flex-col`} 
            style={{marginLeft, ...style}}
        >
            <div className={`w-[${containerWidth}px] bg-white rounded-lg border border-[#EAECF0] ${item.depth > 0 ? "rounded-t-none rounded-br-none" : "rounded-b-none rounded-tr-none"} px-6 py-4 flex items-center gap-1`}>
                <button 
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-lg cursor-grab"
                    {...attributes}
                    {...listeners}
                >
                    <Image src="/move.svg" alt="move" width={20} height={20} />
                </button>
                <div className="w-full flex flex-col gap-[6px]">
                    <h1 className="text-[#101828] text-sm font-semibold">{item.name}</h1>
                    <Link href={item.url} target="_blank" className="text-[#475467] text-sm font-normal w-fit">
                        {item.url}
                    </Link>
                </div>
                <div className="w-[320px] h-[40px] flex rounded-lg border border-[#D0D5DD]">
                    <button onClick={handleDelete} className="w-[67px] h-[40px] border-r border-[#D0D5DD] px-4 py-2 flex items-center justify-center">
                        <span className="text-[#344054] text-sm font-semibold">Usuń</span>
                    </button>
                    <button onClick={handleEdit} className="w-[75px] h-[40px] border-r border-[#D0D5DD] px-4 py-2 flex items-center justify-center">
                        <span className="text-[#344054] text-sm font-semibold">Edytuj</span>
                    </button>
                    <button onClick={handleAdd} className="w-[178px] h-[40px] px-4 py-2 flex items-center justify-center">
                        <span className="text-[#344054] text-sm font-semibold">Dodaj pozycję menu</span>
                    </button>
                </div>
            </div>
            <div className={`${isAdding ? `mt-2 pl-8` : ""}`}>
                {isAdding && (
                    <AddMenuItems 
                        setIsAdding={setIsAdding}
                        getMenuItems={getMenuItems}
                        setMenuItems={setMenuItems}
                        depth={1}
                        parentId={item.id}
                        isAddingNext={true}
                    />
                )}
            </div>
            <div className={`${isEditing ? `mt-2 pl-8` : ""}`}>
                {isEditing && (
                    <EditItem 
                        setIsEditing={setIsEditing}
                        getMenuItems={getMenuItems}
                        setMenuItems={setMenuItems}
                        item={item}
                        isEditing={isEditing}
                    />
                )}
            </div>
            {hasChildren && item.children.map((child) => (
                <MenuItem 
                    key={child.id}
                    item={child}
                    index={index}
                    setMenuItems={setMenuItems}
                    getMenuItems={getMenuItems}
                />
            ))}
        </div>
    );
}

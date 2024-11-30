"use client";

import { useState } from "react";
import EmptyMenu from "./components/EmptyMenu";
import AddMenuItems from "./components/AddMenuItems";
import MenuItem from "./components/MenuItem";

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isAddingNext, setIsAddingNext] = useState(false);

  const getMenuItems = () => menuItems;

  return (
    <div className="w-screen h-screen pt-10 bg-[#f5f5f5] flex justify-center">
      {menuItems.length === 0 ? (
        isAddingNew ? (
          <AddMenuItems setIsAdding={setIsAddingNew} getMenuItems={getMenuItems} setMenuItems={setMenuItems} />
        ) : (
          <EmptyMenu setIsAdding={setIsAddingNew} />
        )
      ) : (
        <div className="w-[1170px] h-fit flex flex-col rounded-lg border border-[#D0D5DD]">
          {menuItems.map((item: MenuItem, index: number) => (
            <MenuItem key={item.id} item={item} index={index} setMenuItems={setMenuItems} getMenuItems={getMenuItems} />
          ))}
          {isAddingNext && <AddMenuItems setIsAdding={setIsAddingNext} getMenuItems={getMenuItems} setMenuItems={setMenuItems} isAddingNext={true} />}
          <div className="w-full h-[80px] bg-[#f5f5f5] rounded-b-lg flex items-center py-5 px-6">
            <button onClick={() => setIsAddingNext(true)} className="w-[178px] h-[40px] px-[14px] py-[10px] flex items-center justify-center rounded-lg bg-[#ffffff] text-[#344054] text-sm font-semibold border border-[#D0D5DD]">
              <span className="text-sm font-semibold">Dodaj pozycję menu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

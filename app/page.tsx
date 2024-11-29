"use client";

import { useState } from "react";
import EmptyMenu from "./components/EmptyMenu";
import AddMenuItems from "./components/AddMenuItems";

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="w-screen h-screen pt-10 bg-[#f5f5f5] flex justify-center">
      {menuItems.length === 0 ? (
        isAdding ? (
          <AddMenuItems setIsAdding={setIsAdding} />
        ) : (
          <EmptyMenu setIsAdding={setIsAdding} />
        )
      ) : (
        <div>menuItems</div>
      )}
    </div>
  );
}

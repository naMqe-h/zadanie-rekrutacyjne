import Image from "next/image";
import Link from "next/link";

interface MenuItemProps {
    item: MenuItem;
    index: number;
}

export default function MenuItem({ item, index }: MenuItemProps) {
    return (
        <div className={`w-[${1168 - (item.depth * 64)}px] h-auto ${index === 0 ? "rounded-t-lg" : ""} flex flex-col`} style={{marginLeft: `${item.depth * 64}px`}}>
            <div className={`w-[${1168 - (item.depth * 64)}px] h-[78px] bg-white rounded-lg border border-[#EAECF0] ${item.depth > 0 ? "rounded-t-none rounded-br-none" : "rounded-b-none rounded-tr-none"} px-6 py-4 flex items-center gap-1`}>
                <button className="w-[40px] h-[40px] flex items-center justify-center rounded-lg">
                    <Image src="/move.svg" alt="move" width={20} height={20} />
                </button>
                <div className="w-full flex flex-col gap-[6px]">
                    <h1 className="text-[#101828] text-sm font-semibold">{item.name}</h1>
                    <Link href={item.url} target="_blank" className="text-[#475467] text-sm font-normal w-fit">{item.url}</Link>
                </div>
                <div className="w-[320px] h-[40px] flex rounded-lg border border-[#D0D5DD]">
                    <button className="w-[67px] h-[40px] border-r border-[#D0D5DD] px-4 py-2 flex items-center justify-center">
                        <span className="text-[#344054] text-sm font-semibold">Usuń</span>
                    </button>
                    <button className="w-[75px] h-[40px] border-r border-[#D0D5DD] px-4 py-2 flex items-center justify-center">
                        <span className="text-[#344054] text-sm font-semibold">Edytuj</span>
                    </button>
                    <button className="w-[178px] h-[40px] px-4 py-2 flex items-center justify-center">
                        <span className="text-[#344054] text-sm font-semibold">Dodaj pozycję menu</span>
                    </button>
                </div>
            </div>
            {/* children */}
            {item.children.length > 0 && item.children.map((child) => (
                <MenuItem key={child.id} item={child} index={index} />
            ))}
        </div>
    )
}

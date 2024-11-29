import Image from "next/image";

export default function MenuItem() {
    return (
        <div className="w-[1168px] h-[78px] bg-white border border-[#EAECF0] rounded-lg px-6 py-4 flex items-center gap-1">
            <button className="w-[40px] h-[40px] flex items-center justify-center rounded-lg">
                <Image src="/move.svg" alt="move" width={20} height={20} />
            </button>
            <div className="w-full flex flex-col gap-[6px]">
                <h1 className="text-[#101828] text-sm font-semibold">Promocje</h1>
                <span className="text-[#475467] text-sm font-normal">https://rc32141.redcart.pl/promocje</span>
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
    )
}

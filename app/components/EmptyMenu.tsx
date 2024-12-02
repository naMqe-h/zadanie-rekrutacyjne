import Image from "next/image";
import { memo } from 'react';

interface EmptyMenuProps {
    setIsAdding: (isAdding: boolean) => void;
}

const EmptyMenu = memo(function EmptyMenu({ setIsAdding }: EmptyMenuProps) {
    const handleAddClick = () => setIsAdding(true);

    return (
        <div className="w-[1168px] h-[160px] bg-[#f9fafb] flex flex-col justify-center items-center rounded-lg border border-[#EAECF0] px-4 py-6 gap-8">  
            <div className="max-w-[352px] flex flex-col gap-1">
                <h1 className="text-[#101828] text-base text-center font-semibold">Menu jest puste</h1>
                <p className="text-[#475467] text-sm text-center font-normal">W tym menu nie ma jeszcze żadnych linków.</p>
            </div>

            <button
                onClick={handleAddClick}
                type="button"
                aria-label="Dodaj pozycję menu"
                className="bg-[#7F56D9] border border-[#7F56D9] rounded-lg px-[14px] py-[10px] shadow-[0px_1px_2px_0px_#1018280D] flex items-center justify-center gap-1 hover:bg-[#6941C6] hover:border-[#6941C6] transition-colors duration-200"
            >
                <Image src="/Icon.svg" alt="" width={20} height={20} />
                <span className="text-white text-sm font-semibold">Dodaj pozycję menu</span>
            </button>
        </div>
    );
});

export default EmptyMenu;
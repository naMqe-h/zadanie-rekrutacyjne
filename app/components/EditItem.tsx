"use client";

import { Formik, Form, Field, FormikHelpers } from 'formik';
import Image from 'next/image';
import { useMemo } from 'react';
import { validateMenuItemForm } from '../../lib/helpers';

interface EditItemProps {
    setIsEditing: (isEditing: boolean) => void;
    setMenuItems: (menuItems: MenuItem[]) => void;
    getMenuItems: () => MenuItem[];
    item: MenuItem;
    isEditing: boolean;
}

interface FormValues {
    name: string;
    url: string;
}

export default function EditItem({ setIsEditing, getMenuItems, setMenuItems, item, isEditing }: EditItemProps) {
    const initialValues = useMemo(() => ({
        name: item.name,
        url: item.url
    }), [item]);

    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        const menuItems = getMenuItems();

        const updateItem = (items: MenuItem[]): MenuItem[] => {
            return items.map((menuItem) => {
                if (menuItem.id === item.id) {
                    return {
                        ...menuItem,
                        name: values.name,
                        url: values.url
                    };
                }
                if (menuItem.children.length > 0) {
                    return {
                        ...menuItem,
                        children: updateItem(menuItem.children)
                    };
                }
                return menuItem;
            });
        };

        const updatedItems = updateItem(menuItems);
        setMenuItems(updatedItems);
        setIsEditing(false);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validateMenuItemForm}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <Form onSubmit={handleSubmit} className={`w-[1168px] h-[240px] bg-white border border-[#D0D5DD] rounded-lg flex flex-col gap-5 pb-5 ${isEditing ? `my-4 w-auto mx-6` : ""}`}>
                    <div className="w-full h-[160px] pt-5 px-6 flex gap-4">
                        <div className="w-[1064px] h-[140px] flex flex-col gap-2">
                            <div className="w-full h-[66px] flex flex-col gap-[6px]">
                                <div className="flex justify-between">
                                    <label htmlFor="name" className="text-[#344054] text-sm font-medium">Nazwa</label>
                                    {errors.name && touched.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                </div>
                                <Field 
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="np. Promocje"
                                    className={`border ${errors.name && touched.name ? 'border-red-500' : 'border-[#D0D5DD]'} rounded-lg py-2 px-3 bg-white`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                            </div>
                            <div className="w-full h-[66px] flex flex-col gap-[6px]">
                                <div className="flex justify-between">
                                    <label htmlFor="url" className="text-[#344054] text-sm font-medium">Link</label>
                                    {errors.url && touched.url && <span className="text-red-500 text-sm">{errors.url}</span>}
                                </div>
                                <div className="relative">
                                    <Field
                                        type="text"
                                        id="url" 
                                        name="url"
                                        placeholder="Wklej lub wyszukaj"
                                        className={`w-full h-[40px] border ${errors.url && touched.url ? 'border-red-500' : 'border-[#D0D5DD]'} rounded-lg px-[14px] pl-8 py-2 bg-white shadow-[0px_1px_2px_0px_#1018280D]`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.url}
                                    />
                                    <Image src="/loupe.svg" alt="loupe" width={15} height={15} className="absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[40px] h-[40px]'>
                            <button type="button" className='w-[40px] h-[40px] flex items-center justify-center rounded-lg p-[10px]'>
                                <Image src="/trash.svg" alt="trash" width={20} height={20} />
                            </button>
                        </div>
                    </div>
                    <div className='w-full h-[40px] px-6 flex justify-start gap-2'>
                        <button 
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className='w-[75px] h-[40px] border border-[#D0D5DD] rounded-lg py-[10px] px-[14px] shadow-[0px_1px_2px_0px_#1018280D] text-[#344054] flex items-center justify-center hover:bg-[#F9FAFB] hover:text-[#182230]'
                        >
                            <span className='font-semibold text-sm'>Anuluj</span>
                        </button>
                        <button 
                            type='submit' 
                            className='w-[72px] h-[40px] border border-[#D6BBFB] rounded-lg py-[10px] px-[14px] shadow-[0px_1px_2px_0px_#1018280D] text-[#6941C6] flex items-center justify-center hover:bg-[#F9F5FF] hover:border-[#D6BBFB] hover:text-[#53389E]'
                            disabled={isSubmitting}
                        >
                            <span className='font-semibold text-sm'>Zapisz</span>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

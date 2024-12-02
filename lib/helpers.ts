import { FormikErrors } from 'formik';

interface FormValues {
    name: string;
    url: string;
}

export const validateMenuItemForm = (values: FormValues): FormikErrors<FormValues> => {
    const errors: FormikErrors<FormValues> = {};
    
    if (!values.name) {
        errors.name = 'Nazwa jest wymagana';
    }
    
    if (!values.url) {
        errors.url = 'Link jest wymagany';
    } else {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!urlRegex.test(values.url)) {
            errors.url = 'Nieprawidłowy format linku';
        }
    }
    
    return errors;
};

export const addItemToChildren = (items: MenuItem[], parentId: string, newItem: MenuItem): MenuItem[] => {
    return items.map((item) => {
        if (item.id === parentId) {
            return {
                ...item,
                children: [...item.children, newItem]
            };
        }
        if (item.children.length > 0) {
            return {
                ...item,
                children: addItemToChildren(item.children, parentId, newItem)
            };
        }
        return item;
    });
};

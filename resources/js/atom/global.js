import { atom } from "recoil";

export const authorManagementState = atom({
    key: "authorManagement",
    default: {
        id: null,
        first_name: "",
        middle_name: "",
        last_name: ""
    }
});

export const bookManagementState = atom({
    key: "bookManagement",
    default: {
        id: null,
        title: "",
        rating: "",
        isbn: "",
        total_pages: 0,
        published_date: ""
    }
});

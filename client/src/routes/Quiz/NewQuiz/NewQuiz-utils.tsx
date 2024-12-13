export const getPlaceholder = (type: number) => {
    switch (type) {
        case 1:
            return "cast";
        case 2:
            return "mertebe";
        case 3:
            return "clique";
        default:
            return "Unknown";
    }
};

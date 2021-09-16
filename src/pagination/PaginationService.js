import { range } from 'lodash';


export const getPageNumbers = (totalNumberOfRecord, pageSize) => {
    let pageCount = Math.ceil(totalNumberOfRecord / pageSize);
    if (pageCount === 0 || pageCount === 1) return null;
    return range(1, pageCount + 1);
}

export const getPageNumberClass = (page, currentPage) => {
    return (page === currentPage) ? 'page-item active' : 'page-item';
}
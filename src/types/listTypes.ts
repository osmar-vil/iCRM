export type ListRequest <filter, order> = {
    page: number;
    limit: number;
    filter: filter;
    order: order;
}

export type ListResponse <T> = {
    count: number;
    pages: number;
    row: T[];
}
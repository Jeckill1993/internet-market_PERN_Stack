
import classes from './Pagination.module.css';

const Pagination = ({ device }) => {
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <div className={classes.pagination}>
            {
                pages.map((page) => {
                    return <div key={page} className={classes.item} onClick={() => {
                        device.setPage(page);
                    }}>{page}</div>;
                })
            }
        </div>
    );
};

export default Pagination;
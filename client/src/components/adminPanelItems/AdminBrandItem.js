import classes from "./AdminPanelItems.module.css";


const AdminBrandItem = ({item, setBrandVisible, setIsEdit}) => {
    const clickEdit = () => {
        setIsEdit(true);
        setBrandVisible(true);
    }

    return (
        <li className={classes.adminItemContainer}>
            <div className={classes.adminItemRow}>
                <div>{item.name}</div>
                <div className={classes.adminItemBtnBox}>
                    <button className={classes.adminEditBtn} onClick={() => {clickEdit()}}>Edit</button>
                    <button className={classes.adminDeleteBtn} />
                </div>
            </div>
        </li>
    )
}

export default AdminBrandItem;
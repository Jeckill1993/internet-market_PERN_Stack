import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import CatalogBrandBar from '../CatalogBrandBar/CatalogBrandBar';
import DeviceList from '../DeviceList/DeviceList';
import Pagination from '../Pagination/Pagination';
import { Context } from '../../index';

import classes from './CatalogContent.module.css';


const CatalogContent = observer(() => {
    const { device } = useContext(Context);

    const devices = device.devices;
    
    return (
        <div className={classes.content}>
            <CatalogBrandBar device={device}/>
            <DeviceList devices={devices}/>
            <Pagination device={device}/>
        </div>
    );
});

export default CatalogContent;